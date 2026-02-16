import { useNavigate, useLocation } from 'react-router-dom'
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
// Card image removed - now in LandingPage
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
} from 'react-icons/fi'

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
const CreditScoreGauge = ({ score = 785, maxScore = 900 }) => {
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
const UserProfileCard = () => (
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
          <Text fontSize="2xl" fontWeight="bold" color="white">RK</Text>
        </Box>

        {/* Name & Job */}
        <Box textAlign="center">
          <Text color="white" fontSize="xl" fontWeight="semibold">
            Rahul Kumar
          </Text>
          <Text color="#94A3B8" fontSize="sm">
            Delivery Partner
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
            <Text color="white" fontSize="sm" fontWeight="medium">₹45,000</Text>
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
            <Text color="white" fontSize="sm" fontWeight="medium">4.8★ Avg</Text>
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
const InsightsPanel = () => (
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
        <InsightItem
          icon={FiCheck}
          text="12 Months consistent electricity payments"
          type="success"
          delay={0.2}
        />
        <InsightItem
          icon={FiStar}
          text="Top-rated Driver (4.9★ on Uber)"
          type="success"
          delay={0.3}
        />
        <InsightItem
          icon={FiAlertTriangle}
          text="Irregular Income detected (High variance)"
          type="warning"
          delay={0.4}
        />
        <InsightItem
          icon={FiTrendingUp}
          text="Income trending up 15% over 6 months"
          type="info"
          delay={0.5}
        />
        <InsightItem
          icon={FiCheck}
          text="No existing loans or EMIs detected"
          type="success"
          delay={0.6}
        />
      </VStack>
    </GlassCard>
  </MotionBox>
)

// Score Factors Component
const ScoreFactors = () => {
  const factors = [
    { label: 'Payment History', value: 92, color: '#10B981' },
    { label: 'Income Stability', value: 78, color: '#F59E0B' },
    { label: 'Platform Tenure', value: 85, color: '#3B82F6' },
    { label: 'Ratings Score', value: 95, color: '#10B981' },
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
          {factors.map((factor, index) => (
            <Box key={factor.label}>
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
const ConnectedPlatforms = ({ platformType }) => {
  const allPlatforms = {
    food: [
      { name: 'Swiggy', rating: '4.9★', orders: '856', icon: 'S', bg: 'orange.500' },
      { name: 'Zomato', rating: '4.7★', orders: '432', icon: 'Z', bg: 'red.500' },
    ],
    ride: [
      { name: 'Uber', rating: '4.8★', rides: '1,240', icon: 'U', bg: 'black' },
      { name: 'Ola', rating: '4.6★', rides: '980', icon: 'O', bg: 'green.500' },
    ],
    both: [
      { name: 'Swiggy', rating: '4.9★', orders: '856', icon: 'S', bg: 'orange.500' },
      { name: 'Zomato', rating: '4.7★', orders: '432', icon: 'Z', bg: 'red.500' },
      { name: 'Uber', rating: '4.8★', rides: '1,240', icon: 'U', bg: 'black' },
      { name: 'Ola', rating: '4.6★', rides: '980', icon: 'O', bg: 'green.500' },
    ],
  }

  const platforms = allPlatforms[platformType] || allPlatforms.both

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
                  {platform.rides ? `${platform.rides} rides` : `${platform.orders} orders`}
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
  const platformType = location.state?.platform || 'both'

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
                Back
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
              <UserProfileCard />
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
                  <CreditScoreGauge score={785} />
                </Flex>
              </GlassCard>
            </GridItem>

            {/* Right Panel - Insights */}
            <GridItem rowSpan={{ base: 1, lg: 2 }}>
              <InsightsPanel />
            </GridItem>

            {/* Bottom Center - Score Factors */}
            <GridItem>
              <ScoreFactors />
            </GridItem>
          </Grid>

          {/* Connected Platforms - Full Width */}
          <Box mt={6} w="full">
            <ConnectedPlatforms platformType={platformType} />
          </Box>

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
    </Box>
  )
}

export default Dashboard ;