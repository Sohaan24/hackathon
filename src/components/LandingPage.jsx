import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Image,
  Input,
  Badge,
  Grid,
  GridItem,
  Stack,
} from '@chakra-ui/react'
import heroImage from '../assets/img2.svg'
import cardImage from '../assets/card _image.jpeg.png'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiCheck,
  FiActivity,
  FiZap,
  FiTrash2,
  FiUploadCloud,
  FiFile,
  FiTruck,
  FiFileText,
  FiWifi,
  FiStar,
  FiBriefcase,
  FiDollarSign,
  FiUser,
} from 'react-icons/fi'
import { BsQrCode } from 'react-icons/bs'

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)

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

// Hero Floating Card Component
const HeroCard = () => (
  <MotionBox
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ 
      opacity: 1, 
      y: [0, -10, 0],
      scale: 1
    }}
    transition={{ 
      opacity: { duration: 0.8, delay: 0.3 },
      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      scale: { duration: 0.5 }
    }}
    transform="perspective(1000px) rotateY(-5deg) rotateX(5deg)"
    _hover={{ transform: 'perspective(1000px) rotateY(-2deg) rotateX(2deg)' }}
    transitionProperty="transform"
    transitionDuration="0.3s"
  >
    <GlassCard p={6} w="320px" position="relative" overflow="hidden">
      {/* Gradient overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="3px"
        bgGradient="linear(to-r, #3B82F6, #10B981)"
      />
      
      {/* User Profile */}
      <Flex align="center" mb={5}>
        <Box
          w="56px"
          h="56px"
          rounded="full"
          bgGradient="linear(to-br, #3B82F6, #8B5CF6)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mr={3}
        >
          <Text fontSize="xl" fontWeight="bold">RK</Text>
        </Box>
        <Box>
          <Text color="white" fontWeight="semibold" fontSize="lg">
            Rahul Kumar
          </Text>
          <Text color="#94A3B8" fontSize="sm">
            Delivery Partner
          </Text>
        </Box>
        <Badge
          ml="auto"
          bg="rgba(16, 185, 129, 0.15)"
          color="#10B981"
          px={2}
          py={1}
          rounded="full"
          fontSize="xs"
        >
          <Flex align="center" gap={1}>
            <Icon as={FiCheck} boxSize={3} />
            Verified
          </Flex>
        </Badge>
      </Flex>

      {/* Gig Platforms */}
      <Text color="#94A3B8" fontSize="xs" mb={2} textTransform="uppercase" letterSpacing="wider">
        Connected Platforms
      </Text>
      <HStack spacing={3} mb={5}>
        <Flex
          align="center"
          bg="rgba(255, 255, 255, 0.05)"
          px={3}
          py={2}
          rounded="lg"
          gap={2}
        >
          <Box w="24px" h="24px" bg="black" rounded="md" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="xs" fontWeight="bold">U</Text>
          </Box>
          <Text color="white" fontSize="sm">4.8★</Text>
          <Icon as={FiCheck} color="#10B981" boxSize={4} />
        </Flex>
        <Flex
          align="center"
          bg="rgba(255, 255, 255, 0.05)"
          px={3}
          py={2}
          rounded="lg"
          gap={2}
        >
          <Box w="24px" h="24px" bg="orange.500" rounded="md" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="xs" fontWeight="bold">S</Text>
          </Box>
          <Text color="white" fontSize="sm">4.9★</Text>
          <Icon as={FiCheck} color="#10B981" boxSize={4} />
        </Flex>
      </HStack>

      {/* Income */}
      <Box
        bg="rgba(16, 185, 129, 0.1)"
        border="1px solid rgba(16, 185, 129, 0.2)"
        rounded="xl"
        p={4}
      >
        <Flex justify="space-between" align="center">
          <Box>
            <Text color="#94A3B8" fontSize="xs" mb={1}>Monthly Income</Text>
            <Text color="white" fontSize="2xl" fontWeight="bold">₹45,000</Text>
          </Box>
          <Badge
            bg="rgba(6, 182, 212, 0.15)"
            color="#06B6D4"
            px={2}
            py={1}
            rounded="full"
            fontSize="xs"
          >
            <Flex align="center" gap={1}>
              <Icon as={FiCheck} boxSize={3} />
              Verified
            </Flex>
          </Badge>
        </Flex>
      </Box>
    </GlassCard>
  </MotionBox>
)

// Data Source Card Component (Dark Mode - for hero area)
const DataSourceCardDark = ({ icon, title, description, delay }) => (
  <MotionBox
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <GlassCard p={6} h="full" _hover={{ border: '1px solid rgba(59, 130, 246, 0.3)' }} transition="all 0.3s">
      <Flex
        w="48px"
        h="48px"
        bg="rgba(59, 130, 246, 0.15)"
        rounded="xl"
        align="center"
        justify="center"
        mb={4}
      >
        <Icon as={icon} boxSize={6} color="#3B82F6" />
      </Flex>
      <Text color="white" fontSize="lg" fontWeight="semibold" mb={2}>
        {title}
      </Text>
      <Text color="#94A3B8" fontSize="sm" lineHeight="tall">
        {description}
      </Text>
    </GlassCard>
  </MotionBox>
)

// Light Mode Data Source Card Component
const LightDataSourceCard = ({ icon, title, description, delay }) => (
  <MotionBox
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <Box
      bg="gray.50"
      p={6}
      rounded="2xl"
      h="full"
      border="1px solid"
      borderColor="gray.200"
      transition="all 0.3s"
      _hover={{ 
        transform: 'translateY(-4px)',
        shadow: 'lg',
        borderColor: 'blue.200'
      }}
    >
      <Flex
        w="48px"
        h="48px"
        bg="blue.50"
        rounded="xl"
        align="center"
        justify="center"
        mb={4}
      >
        <Icon as={icon} boxSize={6} color="#3B82F6" />
      </Flex>
      <Text color="gray.800" fontSize="lg" fontWeight="semibold" mb={2}>
        {title}
      </Text>
      <Text color="gray.600" fontSize="sm" lineHeight="tall">
        {description}
      </Text>
    </Box>
  </MotionBox>
)

// Risk Analysis User Profile Mockup Card
const UserProfileMockup = () => (
  <MotionBox
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <Box
      bg="#0F172A"
      backdropFilter="blur(16px)"
      border="1px solid rgba(255, 255, 255, 0.1)"
      rounded="2xl"
      p={6}
      shadow="2xl"
      maxW="360px"
    >
      {/* Header gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="3px"
        bgGradient="linear(to-r, #3B82F6, #10B981)"
        roundedTop="2xl"
      />
      
      {/* User Info */}
      <Flex align="center" mb={5}>
        <Box
          w="50px"
          h="50px"
          rounded="full"
          bgGradient="linear(to-br, #3B82F6, #8B5CF6)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mr={3}
        >
          <Text fontSize="lg" fontWeight="bold" color="white">R</Text>
        </Box>
        <Box>
          <Text color="white" fontWeight="semibold" fontSize="md">
            Rahul Sharma
          </Text>
          <Text color="#94A3B8" fontSize="sm">
            Full Stack Developer
          </Text>
        </Box>
      </Flex>

      {/* Stats */}
      <VStack spacing={3} align="stretch">
        <Flex
          bg="rgba(255, 255, 255, 0.05)"
          p={3}
          rounded="xl"
          justify="space-between"
          align="center"
        >
          <HStack spacing={2}>
            <Icon as={FiDollarSign} color="#10B981" boxSize={4} />
            <Text color="#94A3B8" fontSize="sm">Monthly Income</Text>
          </HStack>
          <Text color="white" fontWeight="semibold">₹68,000</Text>
        </Flex>
        
        <Flex
          bg="rgba(255, 255, 255, 0.05)"
          p={3}
          rounded="xl"
          justify="space-between"
          align="center"
        >
          <HStack spacing={2}>
            <Icon as={FiBriefcase} color="#3B82F6" boxSize={4} />
            <Text color="#94A3B8" fontSize="sm">Employer</Text>
          </HStack>
          <Text color="white" fontWeight="semibold">Amazon</Text>
        </Flex>

        <Flex
          bg="rgba(16, 185, 129, 0.1)"
          border="1px solid rgba(16, 185, 129, 0.2)"
          p={3}
          rounded="xl"
          justify="space-between"
          align="center"
        >
          <Text color="#94A3B8" fontSize="sm">Risk Level</Text>
          <Badge
            bg="rgba(16, 185, 129, 0.2)"
            color="#10B981"
            px={2}
            py={1}
            rounded="full"
            fontSize="xs"
          >
            Low Risk
          </Badge>
        </Flex>
      </VStack>
    </Box>
  </MotionBox>
)

// Scoring Card Mockup
const ScoringCardMockup = () => (
  <MotionBox
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <Box
      bg="#0F172A"
      backdropFilter="blur(16px)"
      border="1px solid rgba(255, 255, 255, 0.1)"
      rounded="2xl"
      p={6}
      shadow="2xl"
      maxW="360px"
    >
      {/* Score Header */}
      <Flex align="center" justify="space-between" mb={5}>
        <Text color="#94A3B8" fontSize="sm" textTransform="uppercase" letterSpacing="wider">
          Overall Score
        </Text>
        <Badge
          bg="rgba(16, 185, 129, 0.2)"
          color="#10B981"
          px={3}
          py={1}
          rounded="full"
          fontSize="sm"
        >
          <Flex align="center" gap={1}>
            <Icon as={FiCheck} boxSize={4} />
            Excellent
          </Flex>
        </Badge>
      </Flex>

      {/* Big Score Display */}
      <Flex align="baseline" mb={6}>
        <Text
          fontSize="5xl"
          fontWeight="bold"
          color="white"
          lineHeight="1"
        >
          4.8
        </Text>
        <Text color="#94A3B8" fontSize="xl" ml={1}>/5</Text>
      </Flex>

      {/* Score Breakdown */}
      <VStack spacing={3} align="stretch">
        <Box>
          <Flex justify="space-between" mb={1}>
            <Text color="#94A3B8" fontSize="sm">Income Stability</Text>
            <Text color="white" fontSize="sm">92%</Text>
          </Flex>
          <Box bg="rgba(255, 255, 255, 0.1)" rounded="full" h="6px">
            <Box bg="#10B981" h="full" rounded="full" w="92%" />
          </Box>
        </Box>
        
        <Box>
          <Flex justify="space-between" mb={1}>
            <Text color="#94A3B8" fontSize="sm">Payment History</Text>
            <Text color="white" fontSize="sm">88%</Text>
          </Flex>
          <Box bg="rgba(255, 255, 255, 0.1)" rounded="full" h="6px">
            <Box bg="#3B82F6" h="full" rounded="full" w="88%" />
          </Box>
        </Box>

        <Box>
          <Flex justify="space-between" mb={1}>
            <Text color="#94A3B8" fontSize="sm">Employment Tenure</Text>
            <Text color="white" fontSize="sm">95%</Text>
          </Flex>
          <Box bg="rgba(255, 255, 255, 0.1)" rounded="full" h="6px">
            <Box bg="#10B981" h="full" rounded="full" w="95%" />
          </Box>
        </Box>
      </VStack>
    </Box>
  </MotionBox>
)

// Platform Selection Card
const PlatformOption = ({ icon, title, platforms, isSelected, onClick, color }) => (
  <MotionBox
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Box
      as="button"
      onClick={onClick}
      w="full"
      p={5}
      bg={isSelected ? `rgba(${color}, 0.15)` : 'rgba(255, 255, 255, 0.03)'}
      border="2px solid"
      borderColor={isSelected ? `rgb(${color})` : 'rgba(255, 255, 255, 0.1)'}
      borderRadius="xl"
      textAlign="left"
      transition="all 0.3s"
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
            {platforms}
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
    </Box>
  </MotionBox>
)

// File Upload Component
const FileUpload = ({ files, setFiles, onAnalyze, selectedPlatform, setSelectedPlatform }) => {
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    setFiles((prev) => [...prev, ...newFiles])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const newFiles = Array.from(e.dataTransfer.files)
    setFiles((prev) => [...prev, ...newFiles])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Flex justify="center" align="center" w="full">
      <VStack spacing={6} w="full" maxW="600px">
        {/* Drop Zone */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          w="full"
        >
          <GlassCard
            w="full"
            p={10}
            cursor="pointer"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            border="2px dashed rgba(59, 130, 246, 0.4)"
            _hover={{ 
              border: '2px dashed #3B82F6',
              bg: 'rgba(59, 130, 246, 0.1)',
              transform: 'scale(1.02)'
            }}
            transition="all 0.3s"
          >
            <VStack spacing={4}>
              <MotionBox
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Flex
                  w="80px"
                  h="80px"
                  bg="rgba(59, 130, 246, 0.2)"
                  rounded="full"
                  align="center"
                  justify="center"
                  border="2px solid rgba(59, 130, 246, 0.3)"
                >
                  <Icon as={FiUploadCloud} boxSize={10} color="#3B82F6" />
                </Flex>
              </MotionBox>
              <VStack spacing={1}>
                <Text color="white" fontWeight="bold" fontSize="lg">
                  Drop files here or click to upload
                </Text>
                <Text color="#94A3B8" fontSize="sm">
                  Upload bank statements, utility bills, or gig platform exports
                </Text>
              </VStack>
              <Badge
                bg="rgba(59, 130, 246, 0.15)"
                color="#3B82F6"
                px={3}
                py={1}
                rounded="full"
                fontSize="xs"
              >
                PDF, CSV, XLSX, PNG, JPG
              </Badge>
            </VStack>
            <Input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              display="none"
              accept=".pdf,.csv,.xlsx,.png,.jpg"
            />
          </GlassCard>
        </MotionBox>

        {/* File List */}
        <AnimatePresence mode="popLayout">
          {files.map((file, index) => (
            <MotionFlex
              key={`${file.name}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ duration: 0.2 }}
              w="full"
            >
              <GlassCard w="full" p={4}>
                <Flex align="center" justify="space-between">
                  <Flex align="center" gap={3}>
                    <Flex
                      w="40px"
                      h="40px"
                      bg="rgba(59, 130, 246, 0.15)"
                      rounded="lg"
                      align="center"
                      justify="center"
                    >
                      <Icon as={FiFile} boxSize={5} color="#3B82F6" />
                    </Flex>
                    <Box>
                      <Text color="white" fontSize="sm" fontWeight="medium">
                        {file.name}
                      </Text>
                      <Text color="#94A3B8" fontSize="xs">
                        {(file.size / 1024).toFixed(1)} KB
                      </Text>
                    </Box>
                  </Flex>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    _hover={{ bg: 'rgba(239, 68, 68, 0.15)' }}
                    p={2}
                  >
                    <Icon as={FiTrash2} boxSize={5} color="#EF4444" />
                  </Button>
                </Flex>
              </GlassCard>
            </MotionFlex>
          ))}
        </AnimatePresence>

        {/* Platform Selection */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          w="full"
        >
          <GlassCard p={6}>
            <Text color="white" fontWeight="bold" fontSize="lg" mb={4} textAlign="center">
              Select Your Gig Platforms
            </Text>
            <VStack spacing={3}>
              <PlatformOption
                icon={FiTruck}
                title="Food Delivery"
                platforms="Swiggy, Zomato"
                isSelected={selectedPlatform === 'food'}
                onClick={() => setSelectedPlatform('food')}
                color="255, 107, 53"
              />
              <PlatformOption
                icon={FiUser}
                title="Ride Sharing"
                platforms="Ola, Uber"
                isSelected={selectedPlatform === 'ride'}
                onClick={() => setSelectedPlatform('ride')}
                color="59, 130, 246"
              />
              <PlatformOption
                icon={FiStar}
                title="Both Platforms"
                platforms="Swiggy, Zomato, Ola, Uber"
                isSelected={selectedPlatform === 'both'}
                onClick={() => setSelectedPlatform('both')}
                color="16, 185, 129"
              />
            </VStack>
          </GlassCard>
        </MotionBox>

        {/* Analyze Button */}
        {(files.length > 0 || selectedPlatform) && (
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            w="full"
          >
            <Button
              w="full"
              size="lg"
              bg="linear-gradient(135deg, #3B82F6 0%, #10B981 100%)"
              color="white"
              borderRadius="xl"
              py={7}
              fontWeight="bold"
              _hover={{ 
                bg: 'linear-gradient(135deg, #2563EB 0%, #059669 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 30px rgba(59, 130, 246, 0.4)'
              }}
              transition="all 0.3s"
              onClick={onAnalyze}
              leftIcon={<Icon as={FiActivity} />}
              isDisabled={!selectedPlatform}
            >
              {selectedPlatform ? `Analyze & Generate Score` : 'Select a Platform'}
            </Button>
          </MotionBox>
        )}
      </VStack>
    </Flex>
  )
}

// Main Landing Page Component
const LandingPage = () => {
  const [files, setFiles] = useState([])
  const [selectedPlatform, setSelectedPlatform] = useState(null)
  const navigate = useNavigate()

  const handleAnalyze = () => {
    navigate('/dashboard', { state: { platform: selectedPlatform } })
  }

  return (
    <Box minH="100vh" overflow="hidden">
      {/* Navbar */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        bg="rgba(2, 6, 23, 0.95)"
        backdropFilter="blur(12px)"
        borderBottom="1px solid rgba(255, 255, 255, 0.05)"
      >
        <Container maxW="7xl" px={{ base: 4, md: 8 }} py={4}>
          <Flex justify="space-between" align="center">
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
            <HStack spacing={8}>
              <Text 
                color="#94A3B8" 
                fontSize="sm" 
                cursor="pointer" 
                _hover={{ color: 'white' }}
                transition="color 0.2s"
              >
                How it works
              </Text>
              <Text 
                color="#94A3B8" 
                fontSize="sm" 
                cursor="pointer" 
                _hover={{ color: 'white' }}
                transition="color 0.2s"
              >
                For Lenders
              </Text>
              <Button
                size="md"
                bg="transparent"
                border="2px solid rgba(255, 255, 255, 0.3)"
                color="white"
                px={6}
                fontWeight="semibold"
                borderRadius="xl"
                _hover={{ 
                  bg: 'rgba(59, 130, 246, 0.2)', 
                  borderColor: '#3B82F6',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)'
                }}
                transition="all 0.3s"
              >
                Sign In
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* ============================================ */}
      {/* Hero Section (DARK Background) */}
      {/* ============================================ */}
      <Box bg="#020617" pt={32} pb={20}>
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align="center"
            justify="space-between"
            gap={12}
            w="full"
          >
            {/* Left Content */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              flex={1}
            >
              <VStack align="start" spacing={6}>
                <Badge
                  bg="rgba(59, 130, 246, 0.15)"
                  color="#3B82F6"
                  px={3}
                  py={1}
                  rounded="full"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Credit Underwriting 2.0
                </Badge>
                <Text
                  fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                  fontWeight="bold"
                  color="white"
                  lineHeight="1.1"
                >
                  Underwrite a diverse Workforce
                  <Text
                    as="span"
                    bgGradient="linear(to-r, #60A5FA, #A78BFA)"
                    bgClip="text"
                  >
                    Diverse Workforce
                  </Text>
                  .
                </Text>
                <Text color="#94A3B8" fontSize="xl" maxW="lg">
                  Leverage alternative data from Uber, Zomato, and UPI to score anyone.
                </Text>
                <HStack spacing={4} pt={4}>
                  <MotionBox
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      bg="linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)"
                      color="white"
                      _hover={{ 
                        bg: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                        boxShadow: '0 8px 30px rgba(59, 130, 246, 0.5)'
                      }}
                      px={8}
                      borderRadius="xl"
                      fontWeight="bold"
                      boxShadow="0 4px 20px rgba(59, 130, 246, 0.3)"
                      transition="all 0.3s"
                    >
                      Get Started
                    </Button>
                  </MotionBox>
                  <MotionBox
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      borderColor="rgba(255, 255, 255, 0.3)"
                      borderWidth="2px"
                      color="white"
                      borderRadius="xl"
                      _hover={{ 
                        bg: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.5)'
                      }}
                      px={8}
                      transition="all 0.3s"
                    >
                      Watch Demo
                    </Button>
                  </MotionBox>
                </HStack>
              </VStack>
            </MotionBox>

            {/* Right - Hero Image */}
            <MotionBox
              flex={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Image
                src={heroImage}
                alt="GigScore Dashboard Preview"
                maxW={{ base: "100%", lg: "600px" }}
                w="100%"
                filter="drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))"
              />
            </MotionBox>
          </Flex>
        </Container>
      </Box>

      {/* ============================================ */}
      {/* SECTION A: Data Sources Grid (WHITE Background) */}
      {/* ============================================ */}
      <Box bg="white" py={20}>
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            textAlign="center"
            mb={12}
          >
            <Text color="#3B82F6" fontSize="sm" fontWeight="semibold" mb={2} textTransform="uppercase" letterSpacing="wider">
              Data Integration
            </Text>
            <Text color="gray.800" fontSize={{ base: '3xl', md: '4xl' }} fontWeight="bold" mb={4}>
              Integrate income, work, and tax data.
            </Text>
            <Text color="gray.600" fontSize="lg" maxW="2xl" mx="auto">
              Connect multiple data sources to build a comprehensive financial profile.
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <LightDataSourceCard
              icon={FiTruck}
              title="Gig Economy"
              description="Centralize gig workers' earnings from platforms like Uber, Swiggy, and Zomato."
              delay={0.1}
            />
            <LightDataSourceCard
              icon={FiFileText}
              title="Tax Portals"
              description="Verify employment history and income via tax records and government portals."
              delay={0.2}
            />
            <LightDataSourceCard
              icon={FiWifi}
              title="Utility Data"
              description="Verify addresses and payment consistency via utility usage patterns."
              delay={0.3}
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* ============================================ */}
      {/* SECTION B: Risk Analysis Feature (GRAY Background) */}
      {/* ============================================ */}
      <Box bg="gray.50" py={20}>
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: 12, lg: 16 }}
            alignItems="center"
          >
            {/* Left - Text Content */}
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <VStack align="start" spacing={6}>
                <Badge
                  bg="blue.50"
                  color="#3B82F6"
                  px={3}
                  py={1}
                  rounded="full"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Risk Analysis
                </Badge>
                <Text
                  fontSize={{ base: '3xl', md: '4xl' }}
                  fontWeight="bold"
                  color="gray.800"
                  lineHeight="1.2"
                >
                  Empower your risk analysis {' '}
                  <Text
                    as="span"
                    bgGradient="linear(to-r, #3B82F6, #8B5CF6)"
                    bgClip="text"
                  >
                    reduce default
                  </Text>
                  .
                </Text>
                <Text color="gray.600" fontSize="lg" maxW="lg">
                  Get a real-time view of your users' financial performance. Our AI-powered engine 
                  analyzes income patterns, spending behavior, and payment history to predict risk accurately.
                </Text>
                <HStack spacing={4} pt={2}>
                  <Button
                    size="lg"
                    bg="#3B82F6"
                    color="white"
                    _hover={{ bg: '#2563EB' }}
                    px={6}
                  >
                    Learn More
                  </Button>
                </HStack>
              </VStack>
            </MotionBox>

            {/* Right - Visual Mockup */}
            <Flex justify="center">
              <UserProfileMockup />
            </Flex>
          </Grid>
        </Container>
      </Box>

      {/* ============================================ */}
      {/* SECTION C: Scoring Logic Feature (WHITE Background) */}
      {/* ============================================ */}
      <Box bg="white" py={20}>
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: 12, lg: 16 }}
            alignItems="center"
          >
            {/* Left - Visual Mockup */}
            <Flex justify="center" order={{ base: 2, lg: 1 }}>
              <ScoringCardMockup />
            </Flex>

            {/* Right - Text Content */}
            <MotionBox
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              order={{ base: 1, lg: 2 }}
            >
              <VStack align="start" spacing={6}>
                <Badge
                  bg="green.50"
                  color="#10B981"
                  px={3}
                  py={1}
                  rounded="full"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Scoring Engine
                </Badge>
                <Text
                  fontSize={{ base: '3xl', md: '4xl' }}
                  fontWeight="bold"
                  color="gray.800"
                  lineHeight="1.2"
                >
                  Build scoring models with{' '}
                  <Text
                    as="span"
                    bgGradient="linear(to-r, #10B981, #06B6D4)"
                    bgClip="text"
                  >
                    alternative data
                  </Text>
                  .
                </Text>
                <Text color="gray.600" fontSize="lg" maxW="lg">
                  Transform insights into killer features. Our scoring models use machine learning 
                  to evaluate creditworthiness using non-traditional data points that banks miss.
                </Text>
                <HStack spacing={4} pt={2}>
                  <Button
                    size="lg"
                    bg="#10B981"
                    color="white"
                    _hover={{ bg: '#059669' }}
                    px={6}
                  >
                    Explore Models
                  </Button>
                </HStack>
              </VStack>
            </MotionBox>
          </Grid>
        </Container>
      </Box>

      {/* ============================================ */}
      {/* Card Image Showcase Section */}
      {/* ============================================ */}
      <Box bg="gray.100" py={20}>
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            textAlign="center"
            mb={12}
          >
            <Badge
              bg="purple.100"
              color="purple.600"
              px={3}
              py={1}
              rounded="full"
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="wider"
              mb={4}
            >
              Financial Overview
            </Badge>
            <Text
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight="bold"
              color="gray.800"
              mb={4}
            >
              Your Credit Journey,{' '}
              <Text
                as="span"
                bgGradient="linear(to-r, #8B5CF6, #EC4899)"
                bgClip="text"
              >
                Visualized
              </Text>
            </Text>
            <Text color="gray.600" fontSize="lg" maxW="2xl" mx="auto">
              Get a comprehensive view of your financial health with our intuitive dashboard
            </Text>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Box
              maxW="900px"
              mx="auto"
              p={4}
              bg="white"
              borderRadius="3xl"
              boxShadow="0 25px 80px rgba(0, 0, 0, 0.15)"
              overflow="hidden"
            >
              <Image
                src={cardImage}
                alt="Financial Overview Card"
                w="100%"
                borderRadius="2xl"
              />
            </Box>
          </MotionBox>
        </Container>
      </Box>

      {/* ============================================ */}
      {/* File Upload Section (DARK Background) */}
      {/* ============================================ */}
      <Box bg="#020617" py={20}>
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            textAlign="center"
            mb={12}
          >
            <Text color="#3B82F6" fontSize="sm" fontWeight="semibold" mb={2} textTransform="uppercase" letterSpacing="wider">
              Try It Now
            </Text>
            <Text color="white" fontSize={{ base: '3xl', md: '4xl' }} fontWeight="bold" mb={4}>
              Upload documents to get started
            </Text>
            <Text color="#94A3B8" fontSize="lg" maxW="2xl" mx="auto">
              Upload bank statements, utility bills, or gig platform data to generate a credit score.
            </Text>
          </MotionBox>

          <Box mx="auto">
            <FileUpload 
              files={files} 
              setFiles={setFiles} 
              onAnalyze={handleAnalyze}
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
            />
          </Box>
        </Container>
      </Box>

      {/* ============================================ */}
      {/* Footer */}
      {/* ============================================ */}
      <Box bg="#0F172A" pt={16} pb={8}>
        <Container maxW="7xl" px={{ base: 4, md: 8 }}>
          {/* Footer Top */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={10}
            mb={12}
          >
            {/* Brand Column */}
            <VStack align="start" spacing={4}>
              <HStack spacing={2}>
                <Box
                  w="40px"
                  h="40px"
                  bgGradient="linear(to-br, #3B82F6, #10B981)"
                  rounded="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={FiActivity} color="white" boxSize={5} />
                </Box>
                <Text color="white" fontSize="xl" fontWeight="bold">
                  Gig-Score
                </Text>
              </HStack>
              <Text color="#94A3B8" fontSize="sm" lineHeight="tall">
                Empowering the gig economy with AI-powered credit scoring. 
                Building financial inclusion for the unbanked workforce.
              </Text>
              <HStack spacing={3} pt={2}>
                <Box
                  as="button"
                  w={10}
                  h={10}
                  bg="rgba(255, 255, 255, 0.05)"
                  rounded="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _hover={{ bg: 'rgba(59, 130, 246, 0.2)', transform: 'translateY(-2px)' }}
                  transition="all 0.3s"
                >
                  <Text color="#94A3B8" fontSize="lg">𝕏</Text>
                </Box>
                <Box
                  as="button"
                  w={10}
                  h={10}
                  bg="rgba(255, 255, 255, 0.05)"
                  rounded="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _hover={{ bg: 'rgba(59, 130, 246, 0.2)', transform: 'translateY(-2px)' }}
                  transition="all 0.3s"
                >
                  <Text color="#94A3B8" fontSize="lg">in</Text>
                </Box>
                <Box
                  as="button"
                  w={10}
                  h={10}
                  bg="rgba(255, 255, 255, 0.05)"
                  rounded="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _hover={{ bg: 'rgba(59, 130, 246, 0.2)', transform: 'translateY(-2px)' }}
                  transition="all 0.3s"
                >
                  <Text color="#94A3B8" fontSize="lg">◉</Text>
                </Box>
              </HStack>
            </VStack>

            {/* Product Column */}
            <VStack align="start" spacing={3}>
              <Text color="white" fontWeight="semibold" fontSize="sm" textTransform="uppercase" letterSpacing="wider" mb={2}>
                Product
              </Text>
              <Text color="#94A3B8" fontSize="sm" cursor="pointer" _hover={{ color: 'white' }} transition="color 0.2s">
                How it Works
              </Text>
              <Text color="#94A3B8" fontSize="sm" cursor="pointer" _hover={{ color: 'white' }} transition="color 0.2s">
                Features
              </Text>
              <Text color="#94A3B8" fontSize="sm" cursor="pointer" _hover={{ color: 'white' }} transition="color 0.2s">
                Pricing
              </Text>
              <Text color="#94A3B8" fontSize="sm" cursor="pointer" _hover={{ color: 'white' }} transition="color 0.2s">
                API Documentation
              </Text>
              <Text color="#94A3B8" fontSize="sm" cursor="pointer" _hover={{ color: 'white' }} transition="color 0.2s">
                Integrations
              </Text>
            </VStack>

            {/* Company Column */}
            <VStack align="start" spacing={3}>
              <Text color="white" fontWeight="semibold" fontSize="sm" textTransform="uppercase" letterSpacing="wider" mb={2}>
                Company
              </Text>
              <Text color="#94A3B8" fontSize="sm" cursor="pointer" _hover={{ color: 'white' }} transition="color 0.2s">
                About Us
              </Text>
              <Text color="#94A3B8" fontSize="sm" cursor="pointer" _hover={{ color: 'white' }} transition="color 0.2s">
                Careers
              </Text>
              <Text color="#94A3B8" fontSize="sm" cursor="pointer" _hover={{ color: 'white' }} transition="color 0.2s">
                Press Kit
              </Text>
              <Text color="#94A3B8" fontSize="sm" cursor="pointer" _hover={{ color: 'white' }} transition="color 0.2s">
                Contact
              </Text>
              <Text color="#94A3B8" fontSize="sm" cursor="pointer" _hover={{ color: 'white' }} transition="color 0.2s">
                Blog
              </Text>
            </VStack>

            {/* Legal Column */}
            <VStack align="start" spacing={3}>
              <Text color="white" fontWeight="semibold" fontSize="sm" textTransform="uppercase" letterSpacing="wider" mb={2}>
                Legal
              </Text>
              <Text color="#94A3B8" fontSize="sm" cursor="pointer" _hover={{ color: 'white' }} transition="color 0.2s">
                Privacy Policy
              </Text>
              <Text color="#94A3B8" fontSize="sm" cursor="pointer" _hover={{ color: 'white' }} transition="color 0.2s">
                Terms of Service
              </Text>
              <Text color="#94A3B8" fontSize="sm" cursor="pointer" _hover={{ color: 'white' }} transition="color 0.2s">
                Cookie Policy
              </Text>
              <Text color="#94A3B8" fontSize="sm" cursor="pointer" _hover={{ color: 'white' }} transition="color 0.2s">
                Security
              </Text>
              <HStack spacing={2} mt={2}>
                <Badge
                  bg="rgba(16, 185, 129, 0.15)"
                  color="#10B981"
                  px={2}
                  py={1}
                  rounded="md"
                  fontSize="xs"
                >
                  <Flex align="center" gap={1}>
                    <Icon as={FiCheck} boxSize={3} />
                    SOC2 Compliant
                  </Flex>
                </Badge>
              </HStack>
            </VStack>
          </Grid>

          {/* Divider */}
          <Box h="1px" bg="rgba(255, 255, 255, 0.08)" mb={8} />

          {/* Footer Bottom */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'center', md: 'center' }}
            gap={4}
          >
            <Text color="#64748B" fontSize="sm">
              © 2024 Gig-Score Technologies Pvt. Ltd. All rights reserved.
            </Text>
            <HStack spacing={6}>
              <HStack spacing={2}>
                <Box w={2} h={2} bg="#10B981" rounded="full" />
                <Text color="#94A3B8" fontSize="sm">
                  All systems operational
                </Text>
              </HStack>
              <Text color="#64748B" fontSize="sm">
                Made with ❤️ in India
              </Text>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default LandingPage