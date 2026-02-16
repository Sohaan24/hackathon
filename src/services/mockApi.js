// Mock API Service - Simulates fetching data from UPI and Gig Platforms

// Generate random transaction data based on UPI ID
export const fetchUPITransactions = (upiId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transactions = generateMockTransactions(upiId)
      const analysis = analyzeTransactions(transactions)
      resolve({
        upiId,
        transactions,
        analysis,
        fetchedAt: new Date().toISOString()
      })
    }, 1500)
  })
}

// Generate mock transactions
const generateMockTransactions = (upiId) => {
  const sources = ['Uber', 'Swiggy', 'Zomato', 'Ola', 'Rapido', 'PhonePe', 'GPay']
  const transactions = []
  
  // Generate 6 months of transaction history
  for (let month = 0; month < 6; month++) {
    const numTransactions = Math.floor(Math.random() * 30) + 40 // 40-70 transactions per month
    
    for (let i = 0; i < numTransactions; i++) {
      const date = new Date()
      date.setMonth(date.getMonth() - month)
      date.setDate(Math.floor(Math.random() * 28) + 1)
      
      transactions.push({
        id: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
        date: date.toISOString(),
        amount: Math.floor(Math.random() * 2000) + 200,
        source: sources[Math.floor(Math.random() * sources.length)],
        type: Math.random() > 0.3 ? 'credit' : 'debit',
        description: `Payment from ${sources[Math.floor(Math.random() * sources.length)]}`
      })
    }
  }
  
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
}

// Analyze transactions
const analyzeTransactions = (transactions) => {
  const credits = transactions.filter(t => t.type === 'credit')
  const totalIncome = credits.reduce((sum, t) => sum + t.amount, 0)
  const avgMonthlyIncome = totalIncome / 6
  
  // Calculate income by source
  const incomeBySource = {}
  credits.forEach(t => {
    incomeBySource[t.source] = (incomeBySource[t.source] || 0) + t.amount
  })
  
  // Calculate consistency score (0-100)
  const monthlyIncomes = []
  for (let i = 0; i < 6; i++) {
    const monthStart = new Date()
    monthStart.setMonth(monthStart.getMonth() - i)
    monthStart.setDate(1)
    const monthEnd = new Date(monthStart)
    monthEnd.setMonth(monthEnd.getMonth() + 1)
    
    const monthIncome = credits
      .filter(t => new Date(t.date) >= monthStart && new Date(t.date) < monthEnd)
      .reduce((sum, t) => sum + t.amount, 0)
    
    monthlyIncomes.push(monthIncome)
  }
  
  const avgIncome = monthlyIncomes.reduce((a, b) => a + b, 0) / monthlyIncomes.length
  const variance = monthlyIncomes.reduce((sum, inc) => sum + Math.pow(inc - avgIncome, 2), 0) / monthlyIncomes.length
  const stdDev = Math.sqrt(variance)
  const consistencyScore = Math.max(0, Math.min(100, 100 - (stdDev / avgIncome) * 100))
  
  return {
    totalIncome,
    avgMonthlyIncome: Math.round(avgMonthlyIncome),
    totalTransactions: transactions.length,
    incomeBySource,
    consistencyScore: Math.round(consistencyScore),
    monthlyIncomes
  }
}

// Fetch platform ratings based on credentials
export const fetchPlatformRatings = (platforms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const ratings = {}
      
      if (platforms.uber?.driverName) {
        ratings.uber = {
          platform: 'Uber',
          driverName: platforms.uber.driverName,
          vehicleNumber: platforms.uber.vehicleNumber,
          rating: (Math.random() * 0.8 + 4.2).toFixed(1), // 4.2 - 5.0
          totalRides: Math.floor(Math.random() * 2000) + 500,
          memberSince: '2022-01-15',
          completionRate: Math.floor(Math.random() * 10) + 90,
          acceptanceRate: Math.floor(Math.random() * 15) + 85,
          verified: true
        }
      }
      
      if (platforms.ola?.driverName) {
        ratings.ola = {
          platform: 'Ola',
          driverName: platforms.ola.driverName,
          vehicleNumber: platforms.ola.vehicleNumber,
          rating: (Math.random() * 0.8 + 4.1).toFixed(1),
          totalRides: Math.floor(Math.random() * 1500) + 400,
          memberSince: '2022-03-20',
          completionRate: Math.floor(Math.random() * 10) + 88,
          acceptanceRate: Math.floor(Math.random() * 15) + 82,
          verified: true
        }
      }
      
      if (platforms.zomato?.partnerId) {
        ratings.zomato = {
          platform: 'Zomato',
          partnerId: platforms.zomato.partnerId,
          partnerName: platforms.zomato.partnerName || 'Delivery Partner',
          rating: (Math.random() * 0.6 + 4.3).toFixed(1),
          totalDeliveries: Math.floor(Math.random() * 3000) + 800,
          memberSince: '2021-08-10',
          onTimeDelivery: Math.floor(Math.random() * 8) + 92,
          customerSatisfaction: Math.floor(Math.random() * 10) + 90,
          verified: true
        }
      }
      
      if (platforms.swiggy?.partnerId) {
        ratings.swiggy = {
          platform: 'Swiggy',
          partnerId: platforms.swiggy.partnerId,
          partnerName: platforms.swiggy.partnerName || 'Delivery Partner',
          rating: (Math.random() * 0.7 + 4.2).toFixed(1),
          totalDeliveries: Math.floor(Math.random() * 2500) + 600,
          memberSince: '2021-11-05',
          onTimeDelivery: Math.floor(Math.random() * 8) + 91,
          customerSatisfaction: Math.floor(Math.random() * 10) + 88,
          verified: true
        }
      }
      
      resolve(ratings)
    }, 2000)
  })
}

// Calculate Gig Score based on all data
export const calculateGigScore = (upiData, platformRatings) => {
  let score = 300 // Base score
  
  // Transaction frequency factor (max 150 points)
  if (upiData?.analysis) {
    const txnScore = Math.min(150, (upiData.analysis.totalTransactions / 300) * 150)
    score += txnScore
  }
  
  // Income consistency factor (max 150 points)
  if (upiData?.analysis?.consistencyScore) {
    score += (upiData.analysis.consistencyScore / 100) * 150
  }
  
  // Platform ratings factor (max 200 points)
  const ratings = Object.values(platformRatings || {})
  if (ratings.length > 0) {
    const avgRating = ratings.reduce((sum, r) => sum + parseFloat(r.rating), 0) / ratings.length
    score += ((avgRating - 3) / 2) * 200 // 3-5 rating maps to 0-200 points
  }
  
  // Tenure factor (max 100 points)
  if (ratings.length > 0) {
    const avgTenureMonths = ratings.reduce((sum, r) => {
      const months = (new Date() - new Date(r.memberSince)) / (1000 * 60 * 60 * 24 * 30)
      return sum + months
    }, 0) / ratings.length
    score += Math.min(100, (avgTenureMonths / 36) * 100)
  }
  
  return {
    score: Math.min(900, Math.round(score)),
    maxScore: 900,
    factors: {
      transactionFrequency: Math.round((upiData?.analysis?.totalTransactions || 0) / 300 * 100),
      incomeConsistency: upiData?.analysis?.consistencyScore || 0,
      platformRating: ratings.length > 0 
        ? Math.round((ratings.reduce((sum, r) => sum + parseFloat(r.rating), 0) / ratings.length - 3) * 50)
        : 0,
      accountTenure: Math.min(100, Math.round((ratings.length > 0 
        ? ratings.reduce((sum, r) => (new Date() - new Date(r.memberSince)) / (1000 * 60 * 60 * 24 * 30), 0) / ratings.length 
        : 0) / 36 * 100))
    }
  }
}

// EMI Calculator
const calculateEMI = (principal, rate, tenure) => {
  const monthlyRate = rate / 12 / 100
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1)
  return Math.round(emi)
}

// Savings Goal Calculator
const calculateSavingsGoal = (targetAmount, months, currentSavings = 0) => {
  const remaining = targetAmount - currentSavings
  const monthlySaving = Math.round(remaining / months)
  return { monthlySaving, totalMonths: months, targetAmount, currentSavings }
}

// Chatbot responses for mutual fund suggestions
export const getChatbotResponse = (message, gigScore, userData) => {
  const lowerMessage = message.toLowerCase()
  
  // EMI Calculator
  if (lowerMessage.includes('emi') || lowerMessage.includes('calculate emi') || lowerMessage.includes('monthly payment')) {
    const loanAmount = gigScore >= 750 ? 500000 : gigScore >= 650 ? 200000 : 100000
    const interestRate = gigScore >= 750 ? 10.5 : gigScore >= 650 ? 14 : 18
    const tenures = [12, 24, 36, 48, 60]
    
    return {
      type: 'emi',
      message: `Based on your Gig-Score of ${gigScore}, here's your EMI breakdown for ₹${loanAmount.toLocaleString()} loan:`,
      emiOptions: tenures.map(tenure => ({
        tenure: `${tenure} months`,
        emi: `₹${calculateEMI(loanAmount, interestRate, tenure).toLocaleString()}`,
        totalPayment: `₹${(calculateEMI(loanAmount, interestRate, tenure) * tenure).toLocaleString()}`,
        interest: `₹${((calculateEMI(loanAmount, interestRate, tenure) * tenure) - loanAmount).toLocaleString()}`
      })),
      interestRate: `${interestRate}% p.a.`
    }
  }
  
  // Savings Goal
  if (lowerMessage.includes('saving') || lowerMessage.includes('save money') || lowerMessage.includes('goal') || lowerMessage.includes('target')) {
    const monthlyIncome = 45000 // Default based on typical gig worker
    const recommendedSavings = Math.round(monthlyIncome * 0.2)
    
    return {
      type: 'savings',
      message: `Great that you're thinking about savings! Here's a personalized plan:`,
      savingsPlan: {
        monthlyIncome: `₹${monthlyIncome.toLocaleString()}`,
        recommendedSavings: `₹${recommendedSavings.toLocaleString()}/month (20% rule)`,
        emergencyFund: {
          target: `₹${(monthlyIncome * 6).toLocaleString()}`,
          description: '6 months of expenses',
          monthsToReach: Math.ceil((monthlyIncome * 6) / recommendedSavings)
        },
        goals: [
          { name: 'Emergency Fund', amount: '₹2,70,000', timeline: '15 months', priority: 'High' },
          { name: 'Vehicle Purchase', amount: '₹1,50,000', timeline: '10 months', priority: 'Medium' },
          { name: 'Home Down Payment', amount: '₹5,00,000', timeline: '3 years', priority: 'Long-term' }
        ]
      },
      tips: [
        'Start with emergency fund (6 months expenses)',
        'Use 50-30-20 rule: 50% needs, 30% wants, 20% savings',
        'Set up automatic transfers on payday',
        'Track expenses weekly to find savings opportunities'
      ]
    }
  }
  
  // Credit Card Recommendations
  if (lowerMessage.includes('credit card') || lowerMessage.includes('card')) {
    if (gigScore >= 750) {
      return {
        type: 'creditCard',
        message: `With your excellent Gig-Score of ${gigScore}, you're eligible for premium credit cards!`,
        cards: [
          { name: 'HDFC Regalia', limit: '₹3,00,000', benefits: '4X rewards on travel, Lounge access', annualFee: '₹2,500' },
          { name: 'Axis Magnus', limit: '₹5,00,000', benefits: 'Edge miles, 35K joining bonus', annualFee: '₹10,000' },
          { name: 'SBI Elite', limit: '₹2,00,000', benefits: 'Milestone rewards, Movie offers', annualFee: '₹4,999' }
        ]
      }
    } else if (gigScore >= 650) {
      return {
        type: 'creditCard',
        message: `Your Gig-Score of ${gigScore} qualifies you for these credit cards:`,
        cards: [
          { name: 'HDFC MoneyBack+', limit: '₹1,00,000', benefits: '2% cashback, Fuel surcharge waiver', annualFee: '₹500' },
          { name: 'ICICI Amazon Pay', limit: '₹75,000', benefits: '5% cashback on Amazon', annualFee: 'Nil' },
          { name: 'Axis Neo', limit: '₹50,000', benefits: 'Accelerated rewards, No annual fee', annualFee: 'Nil' }
        ]
      }
    } else {
      return {
        type: 'creditCard',
        message: `To get better credit cards, focus on improving your Gig-Score:`,
        tips: [
          'Current secured cards can help build credit',
          'Maintain consistent income for 6+ months',
          'Keep platform ratings high',
          'Aim for Gig-Score of 700+ for better options'
        ],
        cards: [
          { name: 'HDFC MoneyBack', limit: '₹25,000', benefits: 'Basic rewards', annualFee: 'Nil' },
          { name: 'SBI SimplyCLICK', limit: '₹30,000', benefits: '10X rewards online', annualFee: '₹499' }
        ]
      }
    }
  }
  
  // Financial Health Tips
  if (lowerMessage.includes('improve') || lowerMessage.includes('tip') || lowerMessage.includes('advice') || lowerMessage.includes('better')) {
    const tips = gigScore >= 750 ? [
      'Diversify income across multiple platforms',
      'Consider investing in equity mutual funds',
      'Build a portfolio with 60% equity, 40% debt',
      'Start SIPs for long-term wealth creation'
    ] : gigScore >= 650 ? [
      'Increase working hours during peak demand',
      'Maintain 4.5+ rating on all platforms',
      'Set up emergency fund (6 months expenses)',
      'Track all expenses using budgeting apps'
    ] : [
      'Focus on one platform first, then expand',
      'Complete all pending verifications',
      'Work during high-demand hours for better income',
      'Respond quickly to requests for higher ratings'
    ]
    
    return {
      type: 'tips',
      message: `Here are personalized tips based on your Gig-Score of ${gigScore}:`,
      tips,
      actionItems: [
        { action: 'Review platform ratings weekly', priority: 'High' },
        { action: 'Track income vs expenses', priority: 'High' },
        { action: 'Set monthly savings target', priority: 'Medium' },
        { action: 'Explore additional gig platforms', priority: 'Low' }
      ]
    }
  }
  
  // Insurance recommendations
  if (lowerMessage.includes('insurance') || lowerMessage.includes('protect') || lowerMessage.includes('cover')) {
    return {
      type: 'insurance',
      message: `As a gig worker, here are essential insurance products for you:`,
      recommendations: [
        { name: 'Health Insurance', coverage: '₹5-10 Lakhs', premium: '₹500-800/month', priority: 'Essential' },
        { name: 'Accident Cover', coverage: '₹10-25 Lakhs', premium: '₹200-400/month', priority: 'Essential' },
        { name: 'Term Life Insurance', coverage: '₹50 Lakhs', premium: '₹400-600/month', priority: 'Important' },
        { name: 'Vehicle Insurance', coverage: 'Comprehensive', premium: '₹3000-8000/year', priority: 'Mandatory' }
      ],
      tips: [
        'Start with health insurance - non-negotiable',
        'Accident cover is crucial for gig workers',
        'Compare quotes from multiple insurers',
        'Check if platforms offer any group insurance'
      ]
    }
  }
  
  // Tax guidance
  if (lowerMessage.includes('tax') || lowerMessage.includes('itr') || lowerMessage.includes('gst')) {
    return {
      type: 'tax',
      message: `Here's tax guidance for gig workers:`,
      guidance: {
        incomeType: 'Business/Profession Income',
        itrForm: 'ITR-3 or ITR-4 (Presumptive)',
        dueDate: 'July 31st every year',
        deductions: [
          'Vehicle expenses (fuel, maintenance)',
          'Mobile/Internet expenses',
          'Equipment depreciation',
          'Section 80C investments (up to ₹1.5L)',
          'Health insurance premium (80D)'
        ]
      },
      tips: [
        'Maintain records of all expenses',
        'If income > ₹20L, consider GST registration',
        'Use ITR-4 for presumptive taxation (simpler)',
        'Pay advance tax quarterly if liability > ₹10,000'
      ]
    }
  }
  
  // Mutual fund suggestions based on score
  if (lowerMessage.includes('mutual fund') || lowerMessage.includes('invest') || lowerMessage.includes('sip')) {
    if (gigScore >= 750) {
      return {
        type: 'investment',
        message: `Great news! With your excellent Gig-Score of ${gigScore}, you're eligible for premium investment options!`,
        suggestions: [
          { name: 'Axis Bluechip Fund', type: 'Large Cap', risk: 'Moderate', returns: '12-15%', minSIP: '₹500' },
          { name: 'Mirae Asset Emerging', type: 'Mid Cap', risk: 'High', returns: '15-20%', minSIP: '₹1000' },
          { name: 'HDFC Index Fund', type: 'Index Fund', risk: 'Low', returns: '10-12%', minSIP: '₹500' },
          { name: 'SBI Small Cap Fund', type: 'Small Cap', risk: 'Very High', returns: '18-25%', minSIP: '₹1500' }
        ],
        portfolioSuggestion: {
          conservative: '60% Large Cap, 30% Debt, 10% Gold',
          moderate: '50% Large Cap, 30% Mid Cap, 20% Debt',
          aggressive: '40% Large Cap, 40% Mid/Small Cap, 20% Index'
        }
      }
    } else if (gigScore >= 650) {
      return {
        type: 'investment',
        message: `With your good Gig-Score of ${gigScore}, here are suitable investment options for you:`,
        suggestions: [
          { name: 'HDFC Balanced Advantage', type: 'Hybrid', risk: 'Moderate', returns: '10-13%', minSIP: '₹500' },
          { name: 'ICICI Prudential Equity', type: 'Large Cap', risk: 'Moderate', returns: '11-14%', minSIP: '₹500' },
          { name: 'Kotak Standard Multicap', type: 'Multi Cap', risk: 'Moderate-High', returns: '12-16%', minSIP: '₹1000' }
        ]
      }
    } else {
      return {
        type: 'investment',
        message: `Based on your Gig-Score of ${gigScore}, I recommend starting with low-risk options:`,
        suggestions: [
          { name: 'HDFC Liquid Fund', type: 'Liquid', risk: 'Very Low', returns: '5-7%', minSIP: '₹500' },
          { name: 'SBI Overnight Fund', type: 'Overnight', risk: 'Very Low', returns: '4-5%', minSIP: '₹500' },
          { name: 'Axis Short Term Fund', type: 'Debt', risk: 'Low', returns: '6-8%', minSIP: '₹1000' }
        ]
      }
    }
  }
  
  // Loan eligibility
  if (lowerMessage.includes('loan') || lowerMessage.includes('borrow')) {
    if (gigScore >= 750) {
      return {
        type: 'loan',
        message: `Excellent! Your Gig-Score of ${gigScore} qualifies you for premium loan offers:`,
        loanOffers: [
          { type: 'Personal Loan', amount: '₹5,00,000', rate: '10.5%', tenure: '5 years' },
          { type: 'Business Loan', amount: '₹10,00,000', rate: '11%', tenure: '7 years' },
          { type: 'Vehicle Loan', amount: '₹8,00,000', rate: '9.5%', tenure: '5 years' }
        ]
      }
    } else if (gigScore >= 650) {
      return {
        type: 'loan',
        message: `Good! Your Gig-Score of ${gigScore} makes you eligible for these loans:`,
        loanOffers: [
          { type: 'Personal Loan', amount: '₹2,00,000', rate: '14%', tenure: '3 years' },
          { type: 'Working Capital', amount: '₹1,50,000', rate: '15%', tenure: '2 years' }
        ]
      }
    } else {
      return {
        type: 'loan',
        message: `Your current Gig-Score is ${gigScore}. To improve loan eligibility, try:`,
        tips: [
          'Maintain consistent income for 6+ months',
          'Keep platform ratings above 4.5',
          'Increase transaction frequency',
          'Build a longer work history on gig platforms'
        ]
      }
    }
  }
  
  // Score explanation
  if (lowerMessage.includes('score') || lowerMessage.includes('rating') || lowerMessage.includes('how')) {
    return {
      type: 'info',
      message: `Your Gig-Score is ${gigScore}/900. Here's how it's calculated:`,
      factors: [
        { name: 'Transaction Frequency', weight: '30%', description: 'Number of transactions in last 6 months' },
        { name: 'Income Consistency', weight: '25%', description: 'How stable your monthly income is' },
        { name: 'Platform Ratings', weight: '25%', description: 'Average rating across gig platforms' },
        { name: 'Account Tenure', weight: '20%', description: 'How long you\'ve been on platforms' }
      ]
    }
  }
  
  // Default greeting/help
  return {
    type: 'help',
    message: `Hello! I'm your Gig-Score AI Assistant. I can help you with:`,
    options: [
      '💰 Mutual Fund Recommendations',
      '🏦 Loan Eligibility & Offers',
      '💳 Credit Card Suggestions',
      '📊 EMI Calculator',
      '🎯 Savings Goals & Planning',
      '🛡️ Insurance Recommendations',
      '📋 Tax Guidance for Gig Workers',
      '📈 Tips to Improve Your Score'
    ]
  }
}

export default {
  fetchUPITransactions,
  fetchPlatformRatings,
  calculateGigScore,
  getChatbotResponse
}
