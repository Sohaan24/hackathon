import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Input,
  Badge,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiActivity,
  FiSmartphone,
  FiCheck,
  FiArrowRight,
  FiTruck,
  FiUser,
  FiCreditCard,
  FiPhone,
  FiHash,
  FiLoader,
} from 'react-icons/fi'
import { fetchUPITransactions, fetchPlatformRatings, calculateGigScore } from '../services/mockApi'

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

// Platform Selection Card
const PlatformCard = ({ icon, title, subtitle, isSelected, onClick, color, children }) => (
  <MotionBox
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Box
      as="button"
      w="full"
      p={5}
      bg={isSelected ? `rgba(${color}, 0.15)` : 'rgba(255, 255, 255, 0.03)'}
      border="2px solid"
      borderColor={isSelected ? `rgb(${color})` : 'rgba(255, 255, 255, 0.1)'}
      borderRadius="xl"
      textAlign="left"
      transition="all 0.3s"
      onClick={onClick}
      _hover={{
        borderColor: isSelected ? `rgb(${color})` : 'rgba(255, 255, 255, 0.3)',
        bg: isSelected ? `rgba(${color}, 0.2)` : 'rgba(255, 255, 255, 0.05)',
      }}
    >
      <Flex align="center" gap={4}>
        <Flex
          w={12}
          h={12}
          bg={isSelected ? `rgba(${color}, 0.3)` : 'rgba(255, 255, 255, 0.1)'}
          borderRadius="xl"
          align="center"
          justify="center"
        >
          <Icon as={icon} boxSize={6} color={isSelected ? `rgb(${color})` : '#94A3B8'} />
        </Flex>
        <Box flex={1}>
          <Text fontWeight="semibold" color="white" fontSize="md">
            {title}
          </Text>
          <Text fontSize="sm" color="#94A3B8">
            {subtitle}
          </Text>
        </Box>
        <Box
          w={6}
          h={6}
          borderRadius="full"
          border="2px solid"
          borderColor={isSelected ? `rgb(${color})` : 'rgba(255, 255, 255, 0.3)'}
          bg={isSelected ? `rgb(${color})` : 'transparent'}
          display="flex"
          alignItems="center"
          justifyContent="center"
          transition="all 0.3s"
        >
          {isSelected && <Icon as={FiCheck} color="white" boxSize={4} />}
        </Box>
      </Flex>
      
      {/* Expanded Form Fields */}
      <AnimatePresence>
        {isSelected && children && (
          <MotionBox
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            mt={4}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  </MotionBox>
)

// Input Field Component
const InputField = ({ icon, label, placeholder, value, onChange, type = 'text' }) => (
  <Box w="full">
    <Text color="#94A3B8" fontSize="xs" mb={1}>
      {label}
    </Text>
    <Box position="relative">
      <Icon
        as={icon}
        position="absolute"
        left={3}
        top="50%"
        transform="translateY(-50%)"
        color="#64748B"
        boxSize={4}
        zIndex={2}
      />
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        pl={10}
        h="44px"
        bg="rgba(255, 255, 255, 0.05)"
        border="1px solid rgba(255, 255, 255, 0.1)"
        rounded="lg"
        color="white"
        fontSize="sm"
        _placeholder={{ color: '#64748B' }}
        _focus={{
          border: '1px solid #3B82F6',
          boxShadow: '0 0 0 1px #3B82F6',
        }}
        _hover={{
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      />
    </Box>
  </Box>
)

const PlatformIntegration = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  
  // UPI Data
  const [upiId, setUpiId] = useState('')
  const [paymentApp, setPaymentApp] = useState('')
  
  // Platform selection
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    uber: false,
    ola: false,
    zomato: false,
    swiggy: false,
  })
  
  // Platform credentials
  const [platformData, setPlatformData] = useState({
    uber: { driverName: '', vehicleNumber: '', phone: '' },
    ola: { driverName: '', vehicleNumber: '', phone: '' },
    zomato: { partnerId: '', partnerName: '', phone: '' },
    swiggy: { partnerId: '', partnerName: '', phone: '' },
  })

  const togglePlatform = (platform) => {
    setSelectedPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }))
  }

  const updatePlatformData = (platform, field, value) => {
    setPlatformData(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
    }))
  }

  const canProceedStep1 = upiId.length >= 5
  const canProceedStep2 = Object.values(selectedPlatforms).some(v => v)

  const handleAnalyze = async () => {
    setIsLoading(true)
    
    try {
      // Step 1: Fetch UPI Transactions
      setLoadingText('Fetching UPI transaction history...')
      const upiData = await fetchUPITransactions(upiId)
      
      // Step 2: Fetch Platform Ratings
      setLoadingText('Verifying platform credentials...')
      const platformCredentials = {}
      Object.entries(selectedPlatforms).forEach(([platform, isSelected]) => {
        if (isSelected) {
          platformCredentials[platform] = platformData[platform]
        }
      })
      const platformRatings = await fetchPlatformRatings(platformCredentials)
      
      // Step 3: Calculate Score
      setLoadingText('Calculating your Gig-Score...')
      const scoreData = calculateGigScore(upiData, platformRatings)
      
      // Store data for dashboard
      const gigscoreData = {
        upiData,
        platformRatings,
        scoreData,
        userInputs: {
          upiId,
          paymentApp,
          platforms: platformCredentials
        },
        generatedAt: new Date().toISOString()
      }
      
      localStorage.setItem('gigscoreData', JSON.stringify(gigscoreData))
      
      // Navigate to dashboard
      setTimeout(() => {
        navigate('/dashboard', { state: { gigscoreData } })
      }, 500)
      
    } catch (error) {
      console.error('Error:', error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Flex
        minH="60vh"
        align="center"
        justify="center"
        direction="column"
        gap={6}
      >
        <MotionBox
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Box
            w="80px"
            h="80px"
            rounded="full"
            bg="linear-gradient(135deg, #3B82F6 0%, #10B981 100%)"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FiLoader} color="white" boxSize={8} />
          </Box>
        </MotionBox>
        <VStack spacing={2}>
          <Text color="white" fontSize="xl" fontWeight="semibold">
            Analyzing Your Data
          </Text>
          <Text color="#94A3B8" fontSize="sm">
            {loadingText}
          </Text>
        </VStack>
        <Box w="300px">
          <Box
            h="4px"
            bg="rgba(255, 255, 255, 0.1)"
            rounded="full"
            overflow="hidden"
          >
            <MotionBox
              h="full"
              bg="linear-gradient(90deg, #3B82F6, #10B981)"
              rounded="full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 4, ease: 'easeInOut' }}
            />
          </Box>
        </Box>
      </Flex>
    )
  }

  return (
    <VStack spacing={8} w="full" maxW="700px" mx="auto">
      {/* Progress Steps */}
      <Flex justify="center" w="full">
        <HStack spacing={4}>
          {[
            { num: 1, label: 'UPI Details' },
            { num: 2, label: 'Gig Platforms' },
          ].map((s, i) => (
            <Flex key={i} align="center" gap={2}>
              <Box
                w={10}
                h={10}
                borderRadius="full"
                bg={step >= s.num ? 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)' : 'rgba(255,255,255,0.1)'}
                color={step >= s.num ? 'white' : '#64748B'}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="bold"
                fontSize="sm"
                boxShadow={step >= s.num ? '0 0 20px rgba(59, 130, 246, 0.4)' : 'none'}
              >
                {step > s.num ? <Icon as={FiCheck} /> : s.num}
              </Box>
              <Text fontWeight="medium" color={step >= s.num ? 'white' : '#64748B'}>
                {s.label}
              </Text>
              {i < 1 && <Box w={8} h="2px" bg={step > 1 ? '#10B981' : 'rgba(255,255,255,0.1)'} />}
            </Flex>
          ))}
        </HStack>
      </Flex>

      {/* Step 1: UPI Integration */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <MotionBox
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            w="full"
          >
            <VStack spacing={6} w="full">
              <VStack spacing={2} textAlign="center">
                <Text color="white" fontSize="2xl" fontWeight="bold">
                  Connect Your UPI Account
                </Text>
                <Text color="#94A3B8" fontSize="md">
                  We'll analyze your transaction history to calculate income patterns
                </Text>
              </VStack>

              <GlassCard p={6} w="full">
                <VStack spacing={5}>
                  {/* UPI ID Input */}
                  <InputField
                    icon={FiCreditCard}
                    label="UPI ID"
                    placeholder="yourname@paytm, yourname@ybl"
                    value={upiId}
                    onChange={setUpiId}
                  />

                  {/* Payment App Selection */}
                  <Box w="full">
                    <Text color="#94A3B8" fontSize="xs" mb={2}>
                      Select Payment App
                    </Text>
                    <SimpleGrid columns={3} spacing={3}>
                      {['PhonePe', 'GPay', 'Paytm'].map((app) => (
                        <Box
                          key={app}
                          as="button"
                          p={3}
                          bg={paymentApp === app ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)'}
                          border="1px solid"
                          borderColor={paymentApp === app ? '#3B82F6' : 'rgba(255, 255, 255, 0.1)'}
                          rounded="lg"
                          onClick={() => setPaymentApp(app)}
                          _hover={{ bg: 'rgba(255, 255, 255, 0.08)' }}
                          transition="all 0.2s"
                        >
                          <Text color="white" fontSize="sm" fontWeight="medium">
                            {app}
                          </Text>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>

                  {/* Info Banner */}
                  <Box
                    w="full"
                    p={4}
                    bg="rgba(16, 185, 129, 0.1)"
                    border="1px solid rgba(16, 185, 129, 0.2)"
                    rounded="xl"
                  >
                    <Flex align="start" gap={3}>
                      <Icon as={FiSmartphone} color="#10B981" boxSize={5} mt={0.5} />
                      <Box>
                        <Text color="#10B981" fontSize="sm" fontWeight="semibold">
                          Secure & Private
                        </Text>
                        <Text color="#94A3B8" fontSize="xs">
                          We only analyze transaction patterns. Your personal data and transaction details remain encrypted.
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </VStack>
              </GlassCard>

              <Button
                w="full"
                h="52px"
                bg={canProceedStep1 ? 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)' : 'rgba(255, 255, 255, 0.1)'}
                color="white"
                fontSize="md"
                fontWeight="semibold"
                rounded="xl"
                isDisabled={!canProceedStep1}
                onClick={() => setStep(2)}
                _hover={canProceedStep1 ? {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 30px rgba(59, 130, 246, 0.4)',
                } : {}}
                _disabled={{ cursor: 'not-allowed', opacity: 0.5 }}
                transition="all 0.3s"
                rightIcon={<Icon as={FiArrowRight} />}
              >
                Continue to Platform Selection
              </Button>
            </VStack>
          </MotionBox>
        )}

        {/* Step 2: Platform Integration */}
        {step === 2 && (
          <MotionBox
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            w="full"
          >
            <VStack spacing={6} w="full">
              <VStack spacing={2} textAlign="center">
                <Text color="white" fontSize="2xl" fontWeight="bold">
                  Connect Your Gig Platforms
                </Text>
                <Text color="#94A3B8" fontSize="md">
                  Select platforms you work with and enter your credentials
                </Text>
              </VStack>

              <GlassCard p={6} w="full">
                <VStack spacing={4}>
                  {/* Ride Sharing Platforms */}
                  <Box w="full">
                    <Text color="#94A3B8" fontSize="xs" mb={3} textTransform="uppercase" letterSpacing="wider">
                      Ride Sharing
                    </Text>
                    <VStack spacing={3}>
                      <PlatformCard
                        icon={FiUser}
                        title="Uber"
                        subtitle="Enter driver details"
                        isSelected={selectedPlatforms.uber}
                        onClick={() => togglePlatform('uber')}
                        color="0, 0, 0"
                      >
                        <VStack spacing={3}>
                          <InputField
                            icon={FiUser}
                            label="Driver Name (as on Uber)"
                            placeholder="Rahul Kumar"
                            value={platformData.uber.driverName}
                            onChange={(v) => updatePlatformData('uber', 'driverName', v)}
                          />
                          <InputField
                            icon={FiHash}
                            label="Vehicle Number"
                            placeholder="MH 12 AB 1234"
                            value={platformData.uber.vehicleNumber}
                            onChange={(v) => updatePlatformData('uber', 'vehicleNumber', v)}
                          />
                          <InputField
                            icon={FiPhone}
                            label="Phone Number"
                            placeholder="+91 98765 43210"
                            value={platformData.uber.phone}
                            onChange={(v) => updatePlatformData('uber', 'phone', v)}
                          />
                        </VStack>
                      </PlatformCard>

                      <PlatformCard
                        icon={FiUser}
                        title="Ola"
                        subtitle="Enter driver details"
                        isSelected={selectedPlatforms.ola}
                        onClick={() => togglePlatform('ola')}
                        color="76, 175, 80"
                      >
                        <VStack spacing={3}>
                          <InputField
                            icon={FiUser}
                            label="Driver Name (as on Ola)"
                            placeholder="Rahul Kumar"
                            value={platformData.ola.driverName}
                            onChange={(v) => updatePlatformData('ola', 'driverName', v)}
                          />
                          <InputField
                            icon={FiHash}
                            label="Vehicle Number"
                            placeholder="MH 12 AB 1234"
                            value={platformData.ola.vehicleNumber}
                            onChange={(v) => updatePlatformData('ola', 'vehicleNumber', v)}
                          />
                          <InputField
                            icon={FiPhone}
                            label="Phone Number"
                            placeholder="+91 98765 43210"
                            value={platformData.ola.phone}
                            onChange={(v) => updatePlatformData('ola', 'phone', v)}
                          />
                        </VStack>
                      </PlatformCard>
                    </VStack>
                  </Box>

                  {/* Food Delivery Platforms */}
                  <Box w="full" pt={4}>
                    <Text color="#94A3B8" fontSize="xs" mb={3} textTransform="uppercase" letterSpacing="wider">
                      Food Delivery
                    </Text>
                    <VStack spacing={3}>
                      <PlatformCard
                        icon={FiTruck}
                        title="Zomato"
                        subtitle="Enter delivery partner details"
                        isSelected={selectedPlatforms.zomato}
                        onClick={() => togglePlatform('zomato')}
                        color="239, 79, 95"
                      >
                        <VStack spacing={3}>
                          <InputField
                            icon={FiHash}
                            label="Partner ID"
                            placeholder="ZOM123456"
                            value={platformData.zomato.partnerId}
                            onChange={(v) => updatePlatformData('zomato', 'partnerId', v)}
                          />
                          <InputField
                            icon={FiUser}
                            label="Partner Name"
                            placeholder="Rahul Kumar"
                            value={platformData.zomato.partnerName}
                            onChange={(v) => updatePlatformData('zomato', 'partnerName', v)}
                          />
                          <InputField
                            icon={FiPhone}
                            label="Phone Number"
                            placeholder="+91 98765 43210"
                            value={platformData.zomato.phone}
                            onChange={(v) => updatePlatformData('zomato', 'phone', v)}
                          />
                        </VStack>
                      </PlatformCard>

                      <PlatformCard
                        icon={FiTruck}
                        title="Swiggy"
                        subtitle="Enter delivery partner details"
                        isSelected={selectedPlatforms.swiggy}
                        onClick={() => togglePlatform('swiggy')}
                        color="252, 128, 25"
                      >
                        <VStack spacing={3}>
                          <InputField
                            icon={FiHash}
                            label="Partner ID"
                            placeholder="SWG123456"
                            value={platformData.swiggy.partnerId}
                            onChange={(v) => updatePlatformData('swiggy', 'partnerId', v)}
                          />
                          <InputField
                            icon={FiUser}
                            label="Partner Name"
                            placeholder="Rahul Kumar"
                            value={platformData.swiggy.partnerName}
                            onChange={(v) => updatePlatformData('swiggy', 'partnerName', v)}
                          />
                          <InputField
                            icon={FiPhone}
                            label="Phone Number"
                            placeholder="+91 98765 43210"
                            value={platformData.swiggy.phone}
                            onChange={(v) => updatePlatformData('swiggy', 'phone', v)}
                          />
                        </VStack>
                      </PlatformCard>
                    </VStack>
                  </Box>
                </VStack>
              </GlassCard>

              <HStack spacing={4} w="full">
                <Button
                  flex={1}
                  h="52px"
                  bg="transparent"
                  border="1px solid rgba(255, 255, 255, 0.2)"
                  color="white"
                  fontSize="md"
                  fontWeight="semibold"
                  rounded="xl"
                  onClick={() => setStep(1)}
                  _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}
                  transition="all 0.3s"
                >
                  Back
                </Button>
                <Button
                  flex={2}
                  h="52px"
                  bg={canProceedStep2 ? 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)' : 'rgba(255, 255, 255, 0.1)'}
                  color="white"
                  fontSize="md"
                  fontWeight="semibold"
                  rounded="xl"
                  isDisabled={!canProceedStep2}
                  onClick={handleAnalyze}
                  _hover={canProceedStep2 ? {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 30px rgba(59, 130, 246, 0.4)',
                  } : {}}
                  _disabled={{ cursor: 'not-allowed', opacity: 0.5 }}
                  transition="all 0.3s"
                  rightIcon={<Icon as={FiActivity} />}
                >
                  Analyze & Generate Score
                </Button>
              </HStack>
            </VStack>
          </MotionBox>
        )}
      </AnimatePresence>
    </VStack>
  )
}

export default PlatformIntegration
