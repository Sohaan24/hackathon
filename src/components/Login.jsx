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
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiActivity, FiMail, FiLock, FiArrowRight, FiAlertCircle, FiUser, FiPhone } from 'react-icons/fi'
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

const Login = () => {
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login, signup } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (isSignup) {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match')
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters')
        }
        await signup(name, email, phone, password)
      } else {
        await login(email, password)
      }
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsSignup(!isSignup)
    setError('')
    setName('')
    setEmail('')
    setPhone('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <Box minH="100vh" bg="#020617" position="relative" overflow="hidden">
      {/* Animated Background */}
      <Box position="absolute" inset={0} zIndex={0}>
        <MotionBox
          position="absolute"
          top="-20%"
          left="-10%"
          w="50vw"
          h="50vw"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)"
          filter="blur(60px)"
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <MotionBox
          position="absolute"
          bottom="-20%"
          right="-10%"
          w="60vw"
          h="60vw"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)"
          filter="blur(80px)"
          animate={{ x: [0, -80, 0], y: [0, -60, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </Box>

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
          <Flex justify="center" align="center">
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
          </Flex>
        </Container>
      </Box>

      {/* Login Form */}
      <Container maxW="md" pt={32} pb={12} position="relative" zIndex={10}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <VStack spacing={8}>
            {/* Header */}
            <VStack spacing={3} textAlign="center">
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
                {isSignup ? 'Create Account' : 'Welcome Back'}
              </Badge>
              <Text
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                color="white"
                lineHeight="1.2"
              >
                {isSignup ? 'Join' : 'Sign in to'}{' '}
                <Text
                  as="span"
                  bgGradient="linear(to-r, #3B82F6, #10B981)"
                  bgClip="text"
                >
                  Gig-Score
                </Text>
              </Text>
              <Text color="#94A3B8" fontSize="md">
                {isSignup 
                  ? 'Create your account to get your alternative credit score' 
                  : 'Access your credit dashboard and financial insights'}
              </Text>
            </VStack>

            {/* Login Card */}
            <GlassCard p={8} w="full">
              <form onSubmit={handleSubmit}>
                <VStack spacing={5}>
                  {/* Demo Credentials Banner - Only show for login */}
                  {!isSignup && (
                    <Box
                      w="full"
                      p={4}
                      bg="rgba(59, 130, 246, 0.1)"
                      border="1px solid rgba(59, 130, 246, 0.2)"
                      rounded="xl"
                    >
                      <VStack spacing={1} align="start">
                        <Text color="#3B82F6" fontSize="sm" fontWeight="semibold">
                          Demo Credentials
                        </Text>
                        <Text color="#94A3B8" fontSize="xs">
                          Email: demo@gigscore.com
                        </Text>
                        <Text color="#94A3B8" fontSize="xs">
                          Password: gigscore123
                        </Text>
                      </VStack>
                    </Box>
                  )}

                  {/* Error Message */}
                  {error && (
                    <Box
                      w="full"
                      p={3}
                      bg="rgba(239, 68, 68, 0.1)"
                      border="1px solid rgba(239, 68, 68, 0.2)"
                      rounded="lg"
                    >
                      <Flex align="center" gap={2}>
                        <Icon as={FiAlertCircle} color="#EF4444" />
                        <Text color="#EF4444" fontSize="sm">{error}</Text>
                      </Flex>
                    </Box>
                  )}

                  {/* Name Input - Only for signup */}
                  {isSignup && (
                    <Box w="full">
                      <Text color="#94A3B8" fontSize="sm" mb={2}>
                        Full Name
                      </Text>
                      <Box position="relative">
                        <Icon
                          as={FiUser}
                          position="absolute"
                          left={4}
                          top="50%"
                          transform="translateY(-50%)"
                          color="#94A3B8"
                          zIndex={2}
                        />
                        <Input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your full name"
                          pl={12}
                          h="52px"
                          bg="rgba(255, 255, 255, 0.05)"
                          border="1px solid rgba(255, 255, 255, 0.1)"
                          rounded="xl"
                          color="white"
                          _placeholder={{ color: '#64748B' }}
                          _focus={{
                            border: '1px solid #3B82F6',
                            boxShadow: '0 0 0 1px #3B82F6',
                          }}
                          _hover={{
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                          }}
                          required
                        />
                      </Box>
                    </Box>
                  )}

                  {/* Email Input */}
                  <Box w="full">
                    <Text color="#94A3B8" fontSize="sm" mb={2}>
                      Email Address
                    </Text>
                    <Box position="relative">
                      <Icon
                        as={FiMail}
                        position="absolute"
                        left={4}
                        top="50%"
                        transform="translateY(-50%)"
                        color="#94A3B8"
                        zIndex={2}
                      />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        pl={12}
                        h="52px"
                        bg="rgba(255, 255, 255, 0.05)"
                        border="1px solid rgba(255, 255, 255, 0.1)"
                        rounded="xl"
                        color="white"
                        _placeholder={{ color: '#64748B' }}
                        _focus={{
                          border: '1px solid #3B82F6',
                          boxShadow: '0 0 0 1px #3B82F6',
                        }}
                        _hover={{
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                        required
                      />
                    </Box>
                  </Box>

                  {/* Phone Input - Only for signup */}
                  {isSignup && (
                    <Box w="full">
                      <Text color="#94A3B8" fontSize="sm" mb={2}>
                        Phone Number
                      </Text>
                      <Box position="relative">
                        <Icon
                          as={FiPhone}
                          position="absolute"
                          left={4}
                          top="50%"
                          transform="translateY(-50%)"
                          color="#94A3B8"
                          zIndex={2}
                        />
                        <Input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          pl={12}
                          h="52px"
                          bg="rgba(255, 255, 255, 0.05)"
                          border="1px solid rgba(255, 255, 255, 0.1)"
                          rounded="xl"
                          color="white"
                          _placeholder={{ color: '#64748B' }}
                          _focus={{
                            border: '1px solid #3B82F6',
                            boxShadow: '0 0 0 1px #3B82F6',
                          }}
                          _hover={{
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                          }}
                          required
                        />
                      </Box>
                    </Box>
                  )}

                  {/* Password Input */}
                  <Box w="full">
                    <Text color="#94A3B8" fontSize="sm" mb={2}>
                      Password
                    </Text>
                    <Box position="relative">
                      <Icon
                        as={FiLock}
                        position="absolute"
                        left={4}
                        top="50%"
                        transform="translateY(-50%)"
                        color="#94A3B8"
                        zIndex={2}
                      />
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={isSignup ? 'Create a password (min 6 chars)' : 'Enter your password'}
                        pl={12}
                        h="52px"
                        bg="rgba(255, 255, 255, 0.05)"
                        border="1px solid rgba(255, 255, 255, 0.1)"
                        rounded="xl"
                        color="white"
                        _placeholder={{ color: '#64748B' }}
                        _focus={{
                          border: '1px solid #3B82F6',
                          boxShadow: '0 0 0 1px #3B82F6',
                        }}
                        _hover={{
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                        required
                      />
                    </Box>
                  </Box>

                  {/* Confirm Password - Only for signup */}
                  {isSignup && (
                    <Box w="full">
                      <Text color="#94A3B8" fontSize="sm" mb={2}>
                        Confirm Password
                      </Text>
                      <Box position="relative">
                        <Icon
                          as={FiLock}
                          position="absolute"
                          left={4}
                          top="50%"
                          transform="translateY(-50%)"
                          color="#94A3B8"
                          zIndex={2}
                        />
                        <Input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm your password"
                          pl={12}
                          h="52px"
                          bg="rgba(255, 255, 255, 0.05)"
                          border="1px solid rgba(255, 255, 255, 0.1)"
                          rounded="xl"
                          color="white"
                          _placeholder={{ color: '#64748B' }}
                          _focus={{
                            border: '1px solid #3B82F6',
                            boxShadow: '0 0 0 1px #3B82F6',
                          }}
                          _hover={{
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                          }}
                          required
                        />
                      </Box>
                    </Box>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    w="full"
                    h="52px"
                    bg="linear-gradient(135deg, #3B82F6 0%, #10B981 100%)"
                    color="white"
                    fontSize="md"
                    fontWeight="semibold"
                    rounded="xl"
                    isLoading={isLoading}
                    loadingText={isSignup ? 'Creating account...' : 'Signing in...'}
                    _hover={{
                      bg: 'linear-gradient(135deg, #2563EB 0%, #059669 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 30px rgba(59, 130, 246, 0.4)',
                    }}
                    _active={{
                      transform: 'translateY(0)',
                    }}
                    transition="all 0.3s"
                    rightIcon={<Icon as={FiArrowRight} />}
                  >
                    {isSignup ? 'Create Account' : 'Sign In'}
                  </Button>

                  {/* Toggle Login/Signup */}
                  <Box w="full" textAlign="center" pt={2}>
                    <Text color="#94A3B8" fontSize="sm">
                      {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                      <Text
                        as="button"
                        type="button"
                        color="#3B82F6"
                        fontWeight="semibold"
                        onClick={toggleMode}
                        _hover={{ color: '#10B981' }}
                        transition="color 0.2s"
                      >
                        {isSignup ? 'Sign In' : 'Sign Up'}
                      </Text>
                    </Text>
                  </Box>
                </VStack>
              </form>
            </GlassCard>

            {/* Footer */}
            <Text color="#64748B" fontSize="sm" textAlign="center">
              By {isSignup ? 'signing up' : 'signing in'}, you agree to our Terms of Service and Privacy Policy
            </Text>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default Login
