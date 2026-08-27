const fs = require('fs');

const inputs = JSON.parse(fs.readFileSync('C:/Users/user/.gemini/antigravity/brain/710e01ba-c52f-4a28-a902-29ffaf2dde16/scratch/all_user_inputs.json', 'utf8'));

function parseText(text, year, slot) {
  console.log(`Parsing ${year} Slot ${slot}... length: ${text.length}`);
  
  // Extract answers
  const answersMatch = text.match(/Answers\s+VARC\s+([\s\S]*?)Explanations/);
  const answerKey = {};
  if (answersMatch) {
    const answersText = answersMatch[1];
    const regex = /(\d+)\.([A-D0-9.]+)/g;
    let match;
    while ((match = regex.exec(answersText)) !== null) {
      answerKey[match[1]] = match[2];
    }
  }

  // Find all questions using regex: number followed by dot
  const questions = [];
  const questionRegex = /(?:^|\n)(\d+)\.\s+([\s\S]*?)(?=(?:\n\d+\.\s+)|(?:\nAnswers)|$)/g;
  let match;
  let currentSection = 'varc';
  
  while ((match = questionRegex.exec(text)) !== null) {
    const qNum = parseInt(match[1]);
    if (qNum > 66) continue;
    
    if (qNum === 25) currentSection = 'lrdi';
    if (qNum === 47) currentSection = 'quant';

    const qBody = match[2].trim();
    
    // Check if it has A, B, C, D options
    const optionRegex = /\nA\s+(.*?)\nB\s+(.*?)\nC\s+(.*?)\nD\s+(.*?)(?=\n|$)/;
    const optMatch = qBody.match(optionRegex);
    
    let textOnly = qBody;
    let options = [];
    let type = 'tita';
    
    if (optMatch) {
      type = 'mcq';
      textOnly = qBody.substring(0, optMatch.index).trim();
      options = [optMatch[1].trim(), optMatch[2].trim(), optMatch[3].trim(), optMatch[4].trim()];
    }
    
    let correctAnswer = answerKey[qNum] || '';
    if (type === 'mcq' && ['A', 'B', 'C', 'D'].includes(correctAnswer)) {
      correctAnswer = correctAnswer.charCodeAt(0) - 65; // 0, 1, 2, 3
    }
    
    questions.push({
      id: `${currentSection[0]}${qNum}`,
      section: currentSection,
      type,
      text: textOnly,
      options,
      correctAnswer,
      topicId: currentSection === 'quant' ? 'algebra' : currentSection === 'varc' ? 'rc' : 'puzzles'
    });
  }

  console.log(`Extracted ${questions.length} questions.`);

  const sections = ['varc', 'lrdi', 'quant'].map(secId => ({
    id: secId,
    name: secId.toUpperCase(),
    timeLimit: 2400,
    questions: questions.filter(q => q.section === secId)
  }));

  const tsContent = `export const CAT_${year}_SLOT_${slot} = {
  id: 'cat-${year}-slot-${slot}',
  name: 'CAT ${year} Slot ${slot}',
  sections: ${JSON.stringify(sections, null, 2)}
};`;

  fs.writeFileSync(`src/lib/content/mocks/cat-${year}-slot-${slot}.ts`, tsContent);
  console.log(`Saved src/lib/content/mocks/cat-${year}-slot-${slot}.ts`);
}

const t25s2 = inputs.find(i => typeof i === 'string' && i.includes('CAT 2025 Slot 2') && i.length > 1000);
if (t25s2) parseText(t25s2, 2025, 2);

const t25s1 = inputs.find(i => typeof i === 'string' && i.includes('CAT 2025 Slot 1') && i.length > 1000);
if (t25s1) parseText(t25s1, 2025, 1);

const t24s1 = inputs.find(i => typeof i === 'string' && i.includes('CAT 2024 Slot 1') && i.length > 1000);
if (t24s1) parseText(t24s1, 2024, 1);

const t24s3 = inputs.find(i => typeof i === 'string' && i.includes('CAT 2024 Slot 3') && i.length > 1000);
if (t24s3) parseText(t24s3, 2024, 3);

const t23s1 = inputs.find(i => typeof i === 'string' && i.includes('CAT 2023 Slot 1') && i.length > 1000);
if (t23s1) parseText(t23s1, 2023, 1);

const t23s2 = inputs.find(i => typeof i === 'string' && i.includes('CAT 2023 Slot 2') && i.length > 1000);
if (t23s2) parseText(t23s2, 2023, 2);
