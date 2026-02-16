import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Grid,
  GridItem,
  Badge,
  Progress,
  SimpleGrid,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  FiCheck,
  FiActivity,
  FiAlertTriangle,
  FiArrowLeft,
  FiTrendingUp,
  FiCalendar,
  FiDollarSign,
  FiStar,
  FiShield,
  FiLogOut,
  FiCreditCard,
  FiTarget,
  FiAward,
  FiPieChart,
} from 'react-icons/fi'
import Chatbot from './Chatbot'
import { useAuth } from '../context/AuthContext'

const MotionBox = motion(Box)

// Glass Card Component
const GlassCard = ({ children, ...props }) => (
  <Box
    bg="rgba(15, 23, 42, 0.6)"
    backdropFilter="blur(16px)"
    border="1px solid rgba(255, 255, 255, 0.08)"
    rounded="2xl"
    {...props}
  >
    {children}
  </Box>
)

// Circular Score Gauge Component
const CreditScoreGauge = ({ score = 750, maxScore = 900 }) => {
  const percentage = (score / maxScore) * 100
  const circumference = 2 * Math.PI * 120
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75

  const getScoreColor = (score) => {
    if (score >= 750) return '#10B981'
    if (score >= 650) return '#F59E0B'
    return '#EF4444'
  }

  const getScoreLabel = (score) => {
    if (score >= 750) return 'Excellent'
    if (score >= 650) return 'Good'
    if (score >= 550) return 'Fair'
    return 'Poor'
  }

  const scoreColor = getScoreColor(score)
  const scoreLabel = getScoreLabel(score)

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box position="relative" w="280px" h="280px">
        <svg
          width="280"
          height="280"
          viewBox="0 0 280 280"
          style={{ transform: 'rotate(-225deg)' }}
        >
          {/* Background Arc */}
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="16"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeLinecap="round"
          />
          {/* Progress Arc */}
          <motion.circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke={scoreColor}
            strokeWidth="16"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 12px ${scoreColor})`,
            }}
          />
        </svg>
        
        {/* Center Content */}
        <Flex
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          direction="column"
          align="center"
        >
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Text
              fontSize="6xl"
              fontWeight="bold"
              color="white"
              lineHeight="1"
            >
              {score}
            </Text>
          </MotionBox>
          <Badge
            bg={`${scoreColor}20`}
            color={scoreColor}
            px={3}
            py={1}
            rounded="full"
            fontSize="sm"
            fontWeight="semibold"
            mt={2}
          >
            {scoreLabel} Credit Health
          </Badge>
        </Flex>
      </Box>

      {/* Score Range */}
      <Flex w="full" justify="space-between" px={4} mt={4}>
        <Text color="#94A3B8" fontSize="sm">300</Text>
        <Text color="#94A3B8" fontSize="sm">900</Text>
      </Flex>
    </MotionBox>
  )
}

// User Profile Card
const UserProfileCard = ({ userData, avgRating, monthlyIncome }) => (
  <MotionBox
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    h="full"
  >
    <GlassCard p={6} h="full">
      <VStack spacing={4} align="center">
        {/* Avatar */}
        <Box
          w="80px"
          h="80px"
          rounded="full"
          bgGradient="linear(to-br, #3B82F6, #8B5CF6)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="3px solid rgba(255, 255, 255, 0.1)"
        >
          <Text fontSize="2xl" fontWeight="bold" color="white">
            {userData?.name?.split(' ').map(n => n[0]).join('') || 'RK'}
          </Text>
        </Box>

        {/* Name & Job */}
        <Box textAlign="center">
          <Text color="white" fontSize="xl" fontWeight="semibold">
            {userData?.name || 'Rahul Kumar'}
          </Text>
          <Text color="#94A3B8" fontSize="sm">
            Gig Worker
          </Text>
        </Box>

        {/* Verified Badge */}
        <Badge
          bg="rgba(16, 185, 129, 0.15)"
          color="#10B981"
          px={3}
          py={1}
          rounded="full"
          fontSize="xs"
        >
          <Flex align="center" gap={1}>
            <Icon as={FiShield} boxSize={3} />
            Identity Verified
          </Flex>
        </Badge>

        {/* Stats */}
        <VStack spacing={3} w="full" pt={4}>
          <Flex
            w="full"
            bg="rgba(255, 255, 255, 0.03)"
            p={3}
            rounded="xl"
            justify="space-between"
            align="center"
          >
            <HStack spacing={2}>
              <Icon as={FiCalendar} color="#3B82F6" boxSize={4} />
              <Text color="#94A3B8" fontSize="sm">Member Since</Text>
            </HStack>
            <Text color="white" fontSize="sm" fontWeight="medium">Jan 2022</Text>
          </Flex>
          
          <Flex
            w="full"
            bg="rgba(255, 255, 255, 0.03)"
            p={3}
            rounded="xl"
            justify="space-between"
            align="center"
          >
            <HStack spacing={2}>
              <Icon as={FiDollarSign} color="#10B981" boxSize={4} />
              <Text color="#94A3B8" fontSize="sm">Monthly Income</Text>
            </HStack>
            <Text color="white" fontSize="sm" fontWeight="medium">₹{monthlyIncome?.toLocaleString() || '45,000'}</Text>
          </Flex>

          <Flex
            w="full"
            bg="rgba(255, 255, 255, 0.03)"
            p={3}
            rounded="xl"
            justify="space-between"
            align="center"
          >
            <HStack spacing={2}>
              <Icon as={FiStar} color="#F59E0B" boxSize={4} />
              <Text color="#94A3B8" fontSize="sm">Platform Rating</Text>
            </HStack>
            <Text color="white" fontSize="sm" fontWeight="medium">{avgRating || '4.8'}★ Avg</Text>
          </Flex>
        </VStack>
      </VStack>
    </GlassCard>
  </MotionBox>
)

// Insight Item Component
const InsightItem = ({ icon, text, type = 'success', delay }) => {
  const colors = {
    success: { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.2)', icon: '#10B981' },
    warning: { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.2)', icon: '#F59E0B' },
    info: { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.2)', icon: '#3B82F6' },
  }

  const colorScheme = colors[type]

  return (
    <MotionBox
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Flex
        bg={colorScheme.bg}
        border={`1px solid ${colorScheme.border}`}
        p={4}
        rounded="xl"
        align="center"
        gap={3}
      >
        <Flex
          w="36px"
          h="36px"
          bg="rgba(255, 255, 255, 0.05)"
          rounded="lg"
          align="center"
          justify="center"
          flexShrink={0}
        >
          <Icon as={icon} color={colorScheme.icon} boxSize={5} />
        </Flex>
        <Text color="white" fontSize="sm">
          {text}
        </Text>
      </Flex>
    </MotionBox>
  )
}

// Insights Panel
const InsightsPanel = ({ insights }) => (
  <MotionBox
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    h="full"
  >
    <GlassCard p={6} h="full">
      <Flex align="center" gap={2} mb={5}>
        <Icon as={FiActivity} color="#3B82F6" boxSize={5} />
        <Text color="white" fontSize="lg" fontWeight="semibold">
          Key Insights
        </Text>
      </Flex>

      <VStack spacing={3} align="stretch">
        {insights?.map((insight, idx) => (
          <InsightItem
            key={idx}
            icon={insight.icon}
            text={insight.text}
            type={insight.type}
            delay={0.2 + idx * 0.1}
          />
        )) || (
          <>
            <InsightItem
              icon={FiCheck}
              text="Transaction history analyzed successfully"
              type="success"
              delay={0.2}
            />
            <InsightItem
              icon={FiStar}
              text="Platform ratings verified"
              type="success"
              delay={0.3}
            />
            <InsightItem
              icon={FiTrendingUp}
              text="Income trending up over 6 months"
              type="info"
              delay={0.4}
            />
            <InsightItem
              icon={FiCheck}
              text="No existing loans detected"
              type="success"
              delay={0.5}
            />
          </>
        )}
      </VStack>
    </GlassCard>
  </MotionBox>
)

// Score Factors Component
const ScoreFactors = ({ factors }) => {
  const defaultFactors = [
    { label: 'Transaction Frequency', value: factors?.transactionFrequency || 85, color: '#10B981' },
    { label: 'Income Consistency', value: factors?.incomeConsistency || 78, color: '#F59E0B' },
    { label: 'Platform Ratings', value: factors?.platformRating || 90, color: '#3B82F6' },
    { label: 'Account Tenure', value: factors?.accountTenure || 75, color: '#10B981' },
  ]

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <GlassCard p={6}>
        <Text color="white" fontSize="lg" fontWeight="semibold" mb={5}>
          Score Breakdown
        </Text>
        <VStack spacing={4} align="stretch">
          {defaultFactors.map((factor, index) => (
            <Box key={index}>
              <Flex justify="space-between" mb={2}>
                <Text color="#94A3B8" fontSize="sm">{factor.label}</Text>
                <Text color="white" fontSize="sm" fontWeight="medium">{factor.value}%</Text>
              </Flex>
              <Box
                bg="rgba(255, 255, 255, 0.1)"
                rounded="full"
                h="8px"
                overflow="hidden"
              >
                <MotionBox
                  bg={factor.color}
                  h="full"
                  rounded="full"
                  initial={{ width: 0 }}
                  animate={{ width: `${factor.value}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  style={{ boxShadow: `0 0 12px ${factor.color}` }}
                />
              </Box>
            </Box>
          ))}
        </VStack>
      </GlassCard>
    </MotionBox>
  )
}

// Connected Platforms Component
const ConnectedPlatforms = ({ platformRatings }) => {
  // Convert platform ratings to display format
  const platformConfig = {
    uber: { name: 'Uber', icon: 'U', bg: 'black', type: 'rides' },
    ola: { name: 'Ola', icon: 'O', bg: 'green.500', type: 'rides' },
    zomato: { name: 'Zomato', icon: 'Z', bg: 'red.500', type: 'orders' },
    swiggy: { name: 'Swiggy', icon: 'S', bg: 'orange.500', type: 'orders' },
  }

  const platforms = Object.entries(platformRatings || {}).map(([key, data]) => {
    const config = platformConfig[key] || { name: key, icon: key[0].toUpperCase(), bg: 'gray.500', type: 'items' }
    return {
      name: config.name,
      rating: `${data.rating}★`,
      count: data.totalRides || data.totalDeliveries || 0,
      icon: config.icon,
      bg: config.bg,
      type: config.type
    }
  })

  // If no platforms, show default
  if (platforms.length === 0) {
    platforms.push(
      { name: 'Uber', rating: '4.8★', count: 1240, icon: 'U', bg: 'black', type: 'rides' },
      { name: 'Swiggy', rating: '4.9★', count: 856, icon: 'S', bg: 'orange.500', type: 'orders' }
    )
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <GlassCard p={6}>
        <Text color="white" fontSize="lg" fontWeight="semibold" mb={5}>
          Connected Platforms
        </Text>
        <SimpleGrid columns={{ base: 2, md: platforms.length }} spacing={4}>
          {platforms.map((platform) => (
            <MotionBox
              key={platform.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Flex
                direction="column"
                align="center"
                bg="rgba(255, 255, 255, 0.03)"
                p={4}
                rounded="xl"
                border="1px solid rgba(255, 255, 255, 0.08)"
                _hover={{ bg: 'rgba(255, 255, 255, 0.06)' }}
                transition="all 0.3s"
              >
                <Box
                  w="56px"
                  h="56px"
                  bg={platform.bg}
                  rounded="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={3}
                  boxShadow={`0 4px 20px rgba(0, 0, 0, 0.3)`}
                >
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    {platform.icon}
                  </Text>
                </Box>
                <Text color="white" fontSize="md" fontWeight="semibold">
                  {platform.name}
                </Text>
                <HStack spacing={1} mt={2}>
                  <Text color="#10B981" fontSize="lg" fontWeight="bold">
                    {platform.rating}
                  </Text>
                  <Icon as={FiCheck} color="#10B981" boxSize={5} />
                </HStack>
                <Text color="#94A3B8" fontSize="xs" mt={1}>
                  {platform.count?.toLocaleString()} {platform.type}
                </Text>
              </Flex>
            </MotionBox>
          ))}
        </SimpleGrid>
      </GlassCard>
    </MotionBox>
  )
}

// Main Dashboard Component
const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, user } = useAuth()
  const [gigscoreData, setGigscoreData] = useState(null)
  
  useEffect(() => {
    // Load data from localStorage or location state
    const storedData = localStorage.getItem('gigscoreData')
    if (location.state?.gigscoreData) {
      setGigscoreData(location.state.gigscoreData)
    } else if (storedData) {
      setGigscoreData(JSON.parse(storedData))
    }
  }, [location.state])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  // Calculate derived values
  const score = gigscoreData?.scoreData?.score || 750
  const platformRatings = gigscoreData?.platformRatings || {}
  const platforms = Object.keys(platformRatings)
  const avgRating = platforms.length > 0 
    ? (platforms.reduce((sum, p) => sum + parseFloat(platformRatings[p].rating), 0) / platforms.length).toFixed(1)
    : '4.8'
  const monthlyIncome = gigscoreData?.upiData?.analysis?.avgMonthlyIncome || 45000
  const factors = gigscoreData?.scoreData?.factors || {}

  return (
    <Box bg="#020617" minH="100vh">
      {/* Navbar */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        bg="rgba(2, 6, 23, 0.8)"
        backdropFilter="blur(12px)"
        borderBottom="1px solid rgba(255, 255, 255, 0.05)"
      >
        <Container maxW="7xl" py={4}>
          <Flex justify="space-between" align="center">
            <HStack spacing={4}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                leftIcon={<Icon as={FiArrowLeft} />}
                color="#94A3B8"
                _hover={{ color: 'white', bg: 'rgba(255, 255, 255, 0.1)' }}
              >
                Home
              </Button>
              <HStack spacing={2}>
                <Box
                  w="32px"
                  h="32px"
                  bgGradient="linear(to-br, #3B82F6, #10B981)"
                  rounded="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={FiActivity} color="white" boxSize={4} />
                </Box>
                <Text color="white" fontSize="xl" fontWeight="bold">
                  Gig-Score
                </Text>
              </HStack>
            </HStack>
            <HStack spacing={4}>
              <Badge
                bg="rgba(16, 185, 129, 0.15)"
                color="#10B981"
                px={3}
                py={1}
                rounded="full"
                fontSize="sm"
              >
                <Flex align="center" gap={1}>
                  <Icon as={FiCheck} boxSize={4} />
                  Analysis Complete
                </Flex>
              </Badge>
              <Button
                size="sm"
                bg="transparent"
                border="1px solid rgba(239, 68, 68, 0.5)"
                color="#EF4444"
                px={3}
                onClick={handleLogout}
                leftIcon={<Icon as={FiLogOut} boxSize={3} />}
                _hover={{ bg: 'rgba(239, 68, 68, 0.1)' }}
              >
                Logout
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Box pt={24} pb={12}>
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          <Box w="full" mx="auto">
            {/* Header */}
            <MotionBox
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              mb={8}
              textAlign="center"
            >
              <Text color="white" fontSize="3xl" fontWeight="bold" mb={2}>
                Credit Analysis Dashboard
              </Text>
              <Text color="#94A3B8" fontSize="lg">
                Comprehensive credit assessment based on alternative data sources
              </Text>
            </MotionBox>

          {/* Bento Grid Layout */}
          <Grid
            templateColumns={{ base: '1fr', lg: '280px 1fr 320px' }}
            templateRows={{ base: 'auto', lg: 'auto auto' }}
            gap={6}
          >
            {/* Left Panel - User Profile */}
            <GridItem rowSpan={{ base: 1, lg: 2 }}>
              <UserProfileCard 
                userData={user}
                avgRating={avgRating}
                monthlyIncome={monthlyIncome}
              />
            </GridItem>

            {/* Center Panel - Credit Score */}
            <GridItem>
              <GlassCard p={8}>
                <Flex direction="column" align="center">
                  <Text
                    color="#94A3B8"
                    fontSize="sm"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    mb={4}
                  >
                    Gig-Score Credit Rating
                  </Text>
                  <CreditScoreGauge score={score} />
                </Flex>
              </GlassCard>
            </GridItem>

            {/* Right Panel - Insights */}
            <GridItem rowSpan={{ base: 1, lg: 2 }}>
              <InsightsPanel />
            </GridItem>

            {/* Bottom Center - Score Factors */}
            <GridItem>
              <ScoreFactors factors={factors} />
            </GridItem>
          </Grid>

          {/* Connected Platforms - Full Width */}
          <Box mt={6} w="full">
            <ConnectedPlatforms platformRatings={platformRatings} />
          </Box>

          {/* Financial Recommendations */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            mt={6}
            w="full"
          >
            <GlassCard p={6}>
              <Flex align="center" gap={2} mb={5}>
                <Icon as={FiTarget} color="#F59E0B" boxSize={5} />
                <Text color="white" fontSize="lg" fontWeight="semibold">
                  Financial Recommendations
                </Text>
              </Flex>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                {/* Loan Eligibility Card */}
                <Box
                  p={4}
                  bg={score >= 700 ? 'rgba(16, 185, 129, 0.1)' : score >= 600 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)'}
                  border={`1px solid ${score >= 700 ? 'rgba(16, 185, 129, 0.2)' : score >= 600 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`}
                  rounded="xl"
                >
                  <Flex align="center" gap={2} mb={3}>
                    <Icon as={FiCreditCard} color={score >= 700 ? '#10B981' : score >= 600 ? '#F59E0B' : '#EF4444'} boxSize={5} />
                    <Text color="white" fontWeight="semibold">Loan Eligibility</Text>
                  </Flex>
                  <Text color="white" fontSize="2xl" fontWeight="bold" mb={1}>
                    ₹{score >= 750 ? '5,00,000' : score >= 700 ? '3,00,000' : score >= 650 ? '1,50,000' : '75,000'}
                  </Text>
                  <Text color="#94A3B8" fontSize="sm">
                    Max eligible amount at {score >= 750 ? '10.5%' : score >= 700 ? '12%' : score >= 650 ? '14%' : '18%'} interest
                  </Text>
                </Box>

                {/* Credit Card Tier */}
                <Box
                  p={4}
                  bg="rgba(139, 92, 246, 0.1)"
                  border="1px solid rgba(139, 92, 246, 0.2)"
                  rounded="xl"
                >
                  <Flex align="center" gap={2} mb={3}>
                    <Icon as={FiAward} color="#8B5CF6" boxSize={5} />
                    <Text color="white" fontWeight="semibold">Credit Card Tier</Text>
                  </Flex>
                  <Text color="white" fontSize="2xl" fontWeight="bold" mb={1}>
                    {score >= 750 ? 'Premium' : score >= 700 ? 'Gold' : score >= 650 ? 'Silver' : 'Basic'}
                  </Text>
                  <Text color="#94A3B8" fontSize="sm">
                    {score >= 750 ? 'Lounge access, 4X rewards' : score >= 700 ? '2X rewards, cashback' : score >= 650 ? 'Basic rewards' : 'Build credit history'}
                  </Text>
                </Box>

                {/* Investment Readiness */}
                <Box
                  p={4}
                  bg="rgba(59, 130, 246, 0.1)"
                  border="1px solid rgba(59, 130, 246, 0.2)"
                  rounded="xl"
                >
                  <Flex align="center" gap={2} mb={3}>
                    <Icon as={FiPieChart} color="#3B82F6" boxSize={5} />
                    <Text color="white" fontWeight="semibold">Investment Profile</Text>
                  </Flex>
                  <Text color="white" fontSize="2xl" fontWeight="bold" mb={1}>
                    {score >= 750 ? 'Aggressive' : score >= 700 ? 'Moderate' : score >= 650 ? 'Conservative' : 'Beginner'}
                  </Text>
                  <Text color="#94A3B8" fontSize="sm">
                    {score >= 750 ? 'Equity, Mid/Small caps' : score >= 700 ? 'Large cap, Hybrid funds' : score >= 650 ? 'Debt funds, FDs' : 'Start with liquid funds'}
                  </Text>
                </Box>
              </SimpleGrid>

              {/* Next Steps */}
              <Box mt={5} p={4} bg="rgba(255, 255, 255, 0.03)" rounded="xl">
                <Text color="#F59E0B" fontSize="sm" fontWeight="semibold" mb={2}>
                  💡 Next Steps to Improve Your Score
                </Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                  {score < 800 && (
                    <Flex align="center" gap={2}>
                      <Icon as={FiCheck} color="#10B981" boxSize={4} />
                      <Text color="#94A3B8" fontSize="sm">Maintain 4.8+ rating on all platforms</Text>
                    </Flex>
                  )}
                  {score < 750 && (
                    <Flex align="center" gap={2}>
                      <Icon as={FiCheck} color="#10B981" boxSize={4} />
                      <Text color="#94A3B8" fontSize="sm">Increase monthly transactions by 20%</Text>
                    </Flex>
                  )}
                  {score < 700 && (
                    <Flex align="center" gap={2}>
                      <Icon as={FiCheck} color="#10B981" boxSize={4} />
                      <Text color="#94A3B8" fontSize="sm">Connect more gig platforms</Text>
                    </Flex>
                  )}
                  <Flex align="center" gap={2}>
                    <Icon as={FiCheck} color="#10B981" boxSize={4} />
                    <Text color="#94A3B8" fontSize="sm">Keep income consistent for 6+ months</Text>
                  </Flex>
                </SimpleGrid>
              </Box>
            </GlassCard>
          </MotionBox>

          {/* Action Buttons */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            mt={8}
            w="full"
          >
            <Flex justify="center" gap={4}>
              <Button
                size="lg"
                bg="#3B82F6"
                color="white"
                _hover={{ bg: '#2563EB' }}
                px={8}
              >
                Download Report
              </Button>
              <Button
                size="lg"
                variant="outline"
                borderColor="rgba(255, 255, 255, 0.2)"
                color="white"
                _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                px={8}
              >
                Apply for Credit
              </Button>
            </Flex>
          </MotionBox>
          </Box>
        </Container>
      </Box>
      
      {/* AI Chatbot */}
      <Chatbot gigScore={score} />
    </Box>
  )
}

export default Dashboard;
