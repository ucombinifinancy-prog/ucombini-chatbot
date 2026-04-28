/**
 * UCOMBINI Facebook Chatbot - Qualifying Questions Flow
 * Date: 2026-04-28
 */

// Qualifying state tracker
const userState = new Map();

// Product categories that need qualifying
const QUALIFYING_CATEGORIES = {
  'малгай': { name: 'Малгай', ask: ['who', 'age', 'budget'] },
  'гутал': { name: 'Гутал', ask: ['who', 'type', 'budget'] },
  'хувцас': { name: 'Хувцас', ask: ['who', 'type', 'size', 'budget'] },
  'аяга': { name: 'Аяга', ask: ['type', 'budget', 'quantity'] },
  'таваг': { name: 'Таваг', ask: ['type', 'budget', 'size'] },
  'дэвсгэр': { name: 'Дэвсгэр', ask: ['type', 'size', 'budget'] },
  'өмд': { name: 'Өмд', ask: ['who', 'size', 'budget'] },
  'цамц': { name: 'Цамц', ask: ['who', 'size', 'budget'] },
};

// Quick reply buttons
const QUICK_REPLIES = {
  who: [
    { content_type: 'text', title: '👔 Том хүн', payload: 'WHO_ADULT' },
    { content_type: 'text', title: '👶 Хүүхэд', payload: 'WHO_CHILD' },
  ],
  adult_type: [
    { content_type: 'text', title: '👨 Эрэгтэй', payload: 'GENDER_MALE' },
    { content_type: 'text', title: '👩 Эмэгтэй', payload: 'GENDER_FEMALE' },
  ],
  child_age: [
    { content_type: 'text', title: '1-2 нас', payload: 'AGE_1_2' },
    { content_type: 'text', title: '3-4 нас', payload: 'AGE_3_4' },
    { content_type: 'text', title: '5-6 нас', payload: 'AGE_5_6' },
    { content_type: 'text', title: '7+ нас', payload: 'AGE_7_PLUS' },
  ],
  budget: [
    { content_type: 'text', title: '5-15K', payload: 'BUDGET_LOW' },
    { content_type: 'text', title: '15-30K', payload: 'BUDGET_MID' },
    { content_type: 'text', title: '30-50K', payload: 'BUDGET_HIGH' },
    { content_type: 'text', title: '50K+', payload: 'BUDGET_PREMIUM' },
  ],
  shoe_type: [
    { content_type: 'text', title: '🏃 Спорт', payload: 'TYPE_SPORT' },
    { content_type: 'text', title: '🏢 Оффис', payload: 'TYPE_OFFICE' },
    { content_type: 'text', title: '🏠 Гэрийн', payload: 'TYPE_HOME' },
    { content_type: 'text', title: '🎁 Бэлэг', payload: 'TYPE_GIFT' },
  ],
  clothing_type: [
    { content_type: 'text', title: '🏢 Оффис', payload: 'TYPE_OFFICE' },
    { content_type: 'text', title: '🏠 Гэрийн', payload: 'TYPE_HOME' },
    { content_type: 'text', title: '🏃 Спорт', payload: 'TYPE_SPORT' },
    { content_type: 'text', title: '🎁 Бэлэг', payload: 'TYPE_GIFT' },
  ],
  size: [
    { content_type: 'text', title: 'S', payload: 'SIZE_S' },
    { content_type: 'text', title: 'M', payload: 'SIZE_M' },
    { content_type: 'text', title: 'L', payload: 'SIZE_L' },
    { content_type: 'text', title: 'XL', payload: 'SIZE_XL' },
    { content_type: 'text', title: 'XXL', payload: 'SIZE_XXL' },
  ],
  contact: [
    { content_type: 'phone_number' },
  ],
};

// Welcome message - Warm, human-like tone
function getWelcomeMessage() {
  return {
    text: `Сайн байна уу! 👋 UCOMBINI-д тавтай морил.

Бидний дэлгүүрээс ямар бараа хайж байна? 

Бага зэрэг тодруулаад өгвөл, таны хэрэгцээнд яг тохирох барааг олж өгье! ✨

Асуух зүйл байвал чөлөөтэй хэлээрэй.`,
    quick_replies: [
      { content_type: 'text', title: '🧢 Малгай хайж байна', payload: 'CAT_CAP' },
      { content_type: 'text', title: '👟 Гутал хайж байна', payload: 'CAT_SHOE' },
      { content_type: 'text', title: '👔 Хувцас хайж байна', payload: 'CAT_CLOTHES' },
      { content_type: 'text', title: '🎁 Бэлэг сонирхож байна', payload: 'CAT_GIFT' },
    ]
  };
}

// Check if message needs qualifying
function needsQualifying(message) {
  const lowerMsg = message.toLowerCase();
  for (const [keyword, config] of Object.entries(QUALIFYING_CATEGORIES)) {
    if (lowerMsg.includes(keyword)) {
      return { needsQualify: true, category: config };
    }
  }
  return { needsQualify: false };
}

// Generate qualifying question based on state - Natural, warm tone
function getQualifyingQuestion(userId, category) {
  const state = userState.get(userId) || { step: 0, answers: {} };
  const questions = category.ask;
  
  if (state.step >= questions.length) {
    return null; // All questions answered
  }
  
  const currentQuestion = questions[state.step];
  
  switch (currentQuestion) {
    case 'who':
      return {
        text: `Ойлголоо, ${category.name.toLowerCase()} хайж байна шүү дээ 🙂\n\nХэнд гэж авах гэж байна? 🤔`,
        quick_replies: QUICK_REPLIES.who
      };
    case 'age':
      if (state.answers.who === 'CHILD') {
        return {
          text: `Хүүхдийнх юм байна. Хэдэн насны хүүхэд вэ? 👶👦`,
          quick_replies: QUICK_REPLIES.child_age
        };
      }
      return {
        text: `Аан, тэгвэл хэдэн төгрөгийн хүрээнд хайж байна? 💸`,
        quick_replies: QUICK_REPLIES.budget
      };
    case 'type':
      if (category.name === 'Гутал') {
        return {
          text: `За тэгээд ямар зориулалттай гутал хэрэгтэй вэ? 👟`,
          quick_replies: QUICK_REPLIES.shoe_type
        };
      }
      return {
        text: `Хаана өмсөх гэж байгаа вэ? 🧐`,
        quick_replies: QUICK_REPLIES.clothing_type
      };
    case 'budget':
      return {
        text: `Хэдэн төгрөгөөр төлөвлөсөн бэ? 💰`,
        quick_replies: QUICK_REPLIES.budget
      };
    case 'size':
      return {
        text: `Размер нь хэд вэ? 📏`,
        quick_replies: QUICK_REPLIES.size
      };
    default:
      return { text: 'Өөр тодруулах зүйл байна уу? 😊' };
  }
}

// Process user answer and advance state
function processAnswer(userId, payload) {
  const state = userState.get(userId) || { step: 0, answers: {} };
  
  // Map payload to answer
  if (payload.startsWith('WHO_')) {
    state.answers.who = payload === 'WHO_CHILD' ? 'CHILD' : 'ADULT';
  } else if (payload.startsWith('GENDER_')) {
    state.answers.gender = payload === 'GENDER_MALE' ? 'MALE' : 'FEMALE';
  } else if (payload.startsWith('AGE_')) {
    state.answers.age = payload.replace('AGE_', '');
  } else if (payload.startsWith('BUDGET_')) {
    state.answers.budget = payload.replace('BUDGET_', '');
  } else if (payload.startsWith('TYPE_')) {
    state.answers.type = payload.replace('TYPE_', '');
  } else if (payload.startsWith('SIZE_')) {
    state.answers.size = payload.replace('SIZE_', '');
  }
  
  state.step += 1;
  userState.set(userId, state);
  
  return state;
}

// Generate product recommendation based on answers - Sales-focused
function getProductRecommendation(category, answers) {
  let budgetText = '';
  let productSuggestion = '';
  
  switch (answers.budget) {
    case 'LOW': 
      budgetText = '5,000-15,000₮'; 
      productSuggestion = 'Энгийн чанартай, ашигтай сонголт';
      break;
    case 'MID': 
      budgetText = '15,000-30,000₮'; 
      productSuggestion = 'Дунд зэргийн чанар, хямдралтай';
      break;
    case 'HIGH': 
      budgetText = '30,000-50,000₮'; 
      productSuggestion = 'Сайн чанар, удаан эдэлгээтэй';
      break;
    case 'PREMIUM': 
      budgetText = '50,000₮+'; 
      productSuggestion = 'Премиум брэнд, хамгийн сайн чанар';
      break;
  }
  
  const whoText = answers.who === 'CHILD' ? 'Хүүхдийн' : 'Том хүний';
  
  return {
    text: `Танд зориулж оллоо! 🎉

📦 ${category.name}:
✅ ${whoText}
✅ ${budgetText}
${answers.size ? `✅ Размер: ${answers.size}` : ''}
${answers.type ? `✅ ${answers.type}` : ''}

${productSuggestion}

👇 Яг одоо үзэх үү? Эсвэл утсаар зөвлөгөө авмаар байна уу?`,
    quick_replies: [
      { content_type: 'text', title: '📸 Зураг үзэх', payload: 'SHOW_PRODUCTS' },
      { content_type: 'text', title: '☎️ 80554678', payload: 'CALL_US' },
      { content_type: 'text', title: '🏪 Дэлгүүр очно', payload: 'VISIT_STORE' },
    ]
  };
}

// Handle bonus card inquiry
function getBonusCardResponse() {
  return {
    text: `🎁 **Бонус карт авах заавар:**

**📋 Бэлтгэх:**
• Иргэний үнэмлэх
• Утасны дугаар

**📍 Хаана:** UCOMBINI дэлгүүр (Дари-Эх)
**🕐 Хэзээ:** 10:00-22:00 (өдөр бүр)

**💎 Давуу тал:**
✅ Худалдан авалт бүрт 3-5% бонус оноо
✅ Төрсөн өдрийн хямдрал
✅ Карт эзэмшигчдийн онцгой урамшуулал

📞 Лавлах: 80554678`,
    quick_replies: [
      { content_type: 'text', title: '✅ Очно', payload: 'WILL_COME' },
      { content_type: 'text', title: '❓ Асуулт байна', payload: 'QUESTION' },
    ]
  };
}

// Main message handler
function handleMessage(userId, messageText, payload = null) {
  // Check for bonus card keywords
  const bonusKeywords = ['бонус', 'карт', 'картаа', 'onoо', 'оноо'];
  if (bonusKeywords.some(kw => messageText.toLowerCase().includes(kw))) {
    return getBonusCardResponse();
  }
  
  // Check if user is in qualifying flow
  if (userState.has(userId)) {
    const state = processAnswer(userId, payload || messageText);
    const category = state.answers.category;
    
    const nextQuestion = getQualifyingQuestion(userId, category);
    if (nextQuestion) {
      return nextQuestion;
    } else {
      // All questions answered, show recommendation
      userState.delete(userId);
      return getProductRecommendation(category, state.answers);
    }
  }
  
  // Check if new inquiry needs qualifying
  const qualifyCheck = needsQualifying(messageText);
  if (qualifyCheck.needsQualify) {
    userState.set(userId, { step: 0, answers: { category: qualifyCheck.category } });
    return getQualifyingQuestion(userId, qualifyCheck.category);
  }
  
  // Default welcome
  return getWelcomeMessage();
}

module.exports = {
  handleMessage,
  getWelcomeMessage,
  getBonusCardResponse,
  needsQualifying,
  processAnswer,
  getProductRecommendation
};
