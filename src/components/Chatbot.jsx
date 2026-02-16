import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Input,
  Icon,
  Badge,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiMessageCircle, 
  FiX, 
  FiSend, 
  FiTrendingUp,
  FiDollarSign,
  FiBarChart2,
  FiArrowRight,
  FiCreditCard,
  FiTarget,
  FiShield,
  FiFileText,
  FiCheckCircle
} from 'react-icons/fi'
import { getChatbotResponse } from '../services/mockApi'

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)

const Chatbot = ({ gigScore = 750 }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send initial greeting
      const greeting = getChatbotResponse('hello', gigScore)
      setMessages([{ type: 'bot', content: greeting }])
    }
  }, [isOpen, gigScore])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setInputValue('')
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: userMessage }])
    
    // Simulate typing
    setIsTyping(true)
    
    setTimeout(() => {
      const response = getChatbotResponse(userMessage, gigScore)
      setMessages(prev => [...prev, { type: 'bot', content: response }])
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickAction = (action) => {
    setInputValue(action)
    setTimeout(() => handleSend(), 100)
  }

  const renderBotMessage = (content) => {
    if (content.type === 'investment') {
      return (
        <VStack align="start" spacing={3} w="full">
          <Text color="white" fontSize="sm">{content.message}</Text>
          <VStack spacing={2} w="full">
            {content.suggestions?.map((fund, idx) => (
              <Box
                key={idx}
                w="full"
                p={3}
                bg="rgba(16, 185, 129, 0.1)"
                border="1px solid rgba(16, 185, 129, 0.2)"
                rounded="lg"
              >
                <Flex justify="space-between" align="start">
                  <Box>
                    <Text color="white" fontSize="sm" fontWeight="semibold">{fund.name}</Text>
                    <Text color="#94A3B8" fontSize="xs">{fund.type}</Text>
                  </Box>
                  <Badge bg="rgba(16, 185, 129, 0.2)" color="#10B981" fontSize="xs">
                    {fund.returns}
                  </Badge>
                </Flex>
                <HStack spacing={4} mt={2}>
                  <Text color="#94A3B8" fontSize="xs">Risk: {fund.risk}</Text>
                  <Text color="#94A3B8" fontSize="xs">Min SIP: {fund.minSIP}</Text>
                </HStack>
              </Box>
            ))}
          </VStack>
        </VStack>
      )
    }

    if (content.type === 'loan') {
      return (
        <VStack align="start" spacing={3} w="full">
          <Text color="white" fontSize="sm">{content.message}</Text>
          {content.loanOffers && (
            <VStack spacing={2} w="full">
              {content.loanOffers.map((loan, idx) => (
                <Box
                  key={idx}
                  w="full"
                  p={3}
                  bg="rgba(59, 130, 246, 0.1)"
                  border="1px solid rgba(59, 130, 246, 0.2)"
                  rounded="lg"
                >
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Text color="white" fontSize="sm" fontWeight="semibold">{loan.type}</Text>
                      <Text color="#3B82F6" fontSize="lg" fontWeight="bold">{loan.amount}</Text>
                    </Box>
                    <VStack spacing={0} align="end">
                      <Text color="#10B981" fontSize="sm" fontWeight="semibold">{loan.rate}</Text>
                      <Text color="#94A3B8" fontSize="xs">{loan.tenure}</Text>
                    </VStack>
                  </Flex>
                </Box>
              ))}
            </VStack>
          )}
          {content.tips && (
            <VStack align="start" spacing={1} w="full">
              {content.tips.map((tip, idx) => (
                <HStack key={idx} spacing={2}>
                  <Icon as={FiArrowRight} color="#F59E0B" boxSize={3} />
                  <Text color="#94A3B8" fontSize="xs">{tip}</Text>
                </HStack>
              ))}
            </VStack>
          )}
        </VStack>
      )
    }

    if (content.type === 'info') {
      return (
        <VStack align="start" spacing={3} w="full">
          <Text color="white" fontSize="sm">{content.message}</Text>
          <VStack spacing={2} w="full">
            {content.factors?.map((factor, idx) => (
              <Box
                key={idx}
                w="full"
                p={3}
                bg="rgba(255, 255, 255, 0.05)"
                rounded="lg"
              >
                <Flex justify="space-between" align="center" mb={1}>
                  <Text color="white" fontSize="sm" fontWeight="semibold">{factor.name}</Text>
                  <Badge bg="rgba(139, 92, 246, 0.2)" color="#8B5CF6" fontSize="xs">
                    {factor.weight}
                  </Badge>
                </Flex>
                <Text color="#94A3B8" fontSize="xs">{factor.description}</Text>
              </Box>
            ))}
          </VStack>
        </VStack>
      )
    }

    if (content.type === 'help') {
      return (
        <VStack align="start" spacing={3} w="full">
          <Text color="white" fontSize="sm">{content.message}</Text>
          <VStack spacing={2} w="full">
            {content.options?.map((option, idx) => (
              <Box
                key={idx}
                as="button"
                w="full"
                p={3}
                bg="rgba(255, 255, 255, 0.05)"
                rounded="lg"
                textAlign="left"
                _hover={{ bg: 'rgba(59, 130, 246, 0.1)' }}
                transition="all 0.2s"
                onClick={() => handleQuickAction(option.split(' ').slice(1).join(' '))}
              >
                <Text color="white" fontSize="sm">{option}</Text>
              </Box>
            ))}
          </VStack>
        </VStack>
      )
    }

    // EMI Calculator response
    if (content.type === 'emi') {
      return (
        <VStack align="start" spacing={3} w="full">
          <Text color="white" fontSize="sm">{content.message}</Text>
          <Badge bg="rgba(59, 130, 246, 0.2)" color="#3B82F6" fontSize="xs" px={2} py={1} rounded="md">
            Interest Rate: {content.interestRate}
          </Badge>
          <VStack spacing={2} w="full">
            {content.emiOptions?.map((option, idx) => (
              <Box
                key={idx}
                w="full"
                p={3}
                bg="rgba(59, 130, 246, 0.1)"
                border="1px solid rgba(59, 130, 246, 0.2)"
                rounded="lg"
              >
                <Flex justify="space-between" align="center">
                  <Text color="#3B82F6" fontSize="sm" fontWeight="semibold">{option.tenure}</Text>
                  <Text color="white" fontSize="md" fontWeight="bold">{option.emi}/mo</Text>
                </Flex>
                <Flex justify="space-between" mt={1}>
                  <Text color="#94A3B8" fontSize="xs">Total: {option.totalPayment}</Text>
                  <Text color="#F59E0B" fontSize="xs">Interest: {option.interest}</Text>
                </Flex>
              </Box>
            ))}
          </VStack>
        </VStack>
      )
    }

    // Savings Plan response
    if (content.type === 'savings') {
      return (
        <VStack align="start" spacing={3} w="full">
          <Text color="white" fontSize="sm">{content.message}</Text>
          <Box w="full" p={3} bg="rgba(16, 185, 129, 0.1)" border="1px solid rgba(16, 185, 129, 0.2)" rounded="lg">
            <Text color="#10B981" fontSize="xs" fontWeight="semibold">Recommended Monthly Savings</Text>
            <Text color="white" fontSize="lg" fontWeight="bold">{content.savingsPlan?.recommendedSavings}</Text>
          </Box>
          <Text color="#94A3B8" fontSize="xs" fontWeight="semibold">YOUR SAVINGS GOALS</Text>
          <VStack spacing={2} w="full">
            {content.savingsPlan?.goals?.map((goal, idx) => (
              <Box key={idx} w="full" p={3} bg="rgba(255, 255, 255, 0.05)" rounded="lg">
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text color="white" fontSize="sm" fontWeight="semibold">{goal.name}</Text>
                    <Text color="#94A3B8" fontSize="xs">{goal.timeline}</Text>
                  </Box>
                  <Badge bg={goal.priority === 'High' ? 'rgba(239, 68, 68, 0.2)' : goal.priority === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)'}
                    color={goal.priority === 'High' ? '#EF4444' : goal.priority === 'Medium' ? '#F59E0B' : '#3B82F6'} fontSize="xs">
                    {goal.amount}
                  </Badge>
                </Flex>
              </Box>
            ))}
          </VStack>
          {content.tips && (
            <VStack align="start" spacing={1} w="full">
              {content.tips.map((tip, idx) => (
                <HStack key={idx} spacing={2}>
                  <Icon as={FiCheckCircle} color="#10B981" boxSize={3} />
                  <Text color="#94A3B8" fontSize="xs">{tip}</Text>
                </HStack>
              ))}
            </VStack>
          )}
        </VStack>
      )
    }

    // Credit Card response
    if (content.type === 'creditCard') {
      return (
        <VStack align="start" spacing={3} w="full">
          <Text color="white" fontSize="sm">{content.message}</Text>
          <VStack spacing={2} w="full">
            {content.cards?.map((card, idx) => (
              <Box key={idx} w="full" p={3} bg="rgba(139, 92, 246, 0.1)" border="1px solid rgba(139, 92, 246, 0.2)" rounded="lg">
                <Flex justify="space-between" align="start">
                  <Box>
                    <Text color="white" fontSize="sm" fontWeight="semibold">{card.name}</Text>
                    <Text color="#94A3B8" fontSize="xs">{card.benefits}</Text>
                  </Box>
                  <Badge bg="rgba(139, 92, 246, 0.2)" color="#8B5CF6" fontSize="xs">{card.limit}</Badge>
                </Flex>
                <Text color="#64748B" fontSize="xs" mt={1}>Annual Fee: {card.annualFee}</Text>
              </Box>
            ))}
          </VStack>
          {content.tips && (
            <VStack align="start" spacing={1} w="full">
              {content.tips.map((tip, idx) => (
                <HStack key={idx} spacing={2}>
                  <Icon as={FiArrowRight} color="#8B5CF6" boxSize={3} />
                  <Text color="#94A3B8" fontSize="xs">{tip}</Text>
                </HStack>
              ))}
            </VStack>
          )}
        </VStack>
      )
    }

    // Tips response
    if (content.type === 'tips') {
      return (
        <VStack align="start" spacing={3} w="full">
          <Text color="white" fontSize="sm">{content.message}</Text>
          <VStack spacing={2} w="full">
            {content.tips?.map((tip, idx) => (
              <HStack key={idx} spacing={2} w="full" p={2} bg="rgba(255, 255, 255, 0.05)" rounded="lg">
                <Icon as={FiCheckCircle} color="#10B981" boxSize={4} />
                <Text color="white" fontSize="sm">{tip}</Text>
              </HStack>
            ))}
          </VStack>
          {content.actionItems && (
            <Box w="full">
              <Text color="#94A3B8" fontSize="xs" fontWeight="semibold" mb={2}>ACTION ITEMS</Text>
              <VStack spacing={1} w="full">
                {content.actionItems.map((item, idx) => (
                  <Flex key={idx} w="full" justify="space-between" align="center" p={2} bg="rgba(255, 255, 255, 0.03)" rounded="md">
                    <Text color="white" fontSize="xs">{item.action}</Text>
                    <Badge bg={item.priority === 'High' ? 'rgba(239, 68, 68, 0.2)' : item.priority === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(100, 116, 139, 0.2)'}
                      color={item.priority === 'High' ? '#EF4444' : item.priority === 'Medium' ? '#F59E0B' : '#64748B'} fontSize="xs">
                      {item.priority}
                    </Badge>
                  </Flex>
                ))}
              </VStack>
            </Box>
          )}
        </VStack>
      )
    }

    // Insurance response
    if (content.type === 'insurance') {
      return (
        <VStack align="start" spacing={3} w="full">
          <Text color="white" fontSize="sm">{content.message}</Text>
          <VStack spacing={2} w="full">
            {content.recommendations?.map((ins, idx) => (
              <Box key={idx} w="full" p={3} bg="rgba(6, 182, 212, 0.1)" border="1px solid rgba(6, 182, 212, 0.2)" rounded="lg">
                <Flex justify="space-between" align="start">
                  <Box>
                    <Text color="white" fontSize="sm" fontWeight="semibold">{ins.name}</Text>
                    <Text color="#94A3B8" fontSize="xs">Coverage: {ins.coverage}</Text>
                  </Box>
                  <Badge bg={ins.priority === 'Essential' ? 'rgba(239, 68, 68, 0.2)' : ins.priority === 'Mandatory' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.2)'}
                    color={ins.priority === 'Essential' ? '#EF4444' : ins.priority === 'Mandatory' ? '#F59E0B' : '#3B82F6'} fontSize="xs">
                    {ins.priority}
                  </Badge>
                </Flex>
                <Text color="#06B6D4" fontSize="xs" mt={1}>Premium: {ins.premium}</Text>
              </Box>
            ))}
          </VStack>
          {content.tips && (
            <VStack align="start" spacing={1} w="full">
              {content.tips.map((tip, idx) => (
                <HStack key={idx} spacing={2}>
                  <Icon as={FiShield} color="#06B6D4" boxSize={3} />
                  <Text color="#94A3B8" fontSize="xs">{tip}</Text>
                </HStack>
              ))}
            </VStack>
          )}
        </VStack>
      )
    }

    // Tax guidance response
    if (content.type === 'tax') {
      return (
        <VStack align="start" spacing={3} w="full">
          <Text color="white" fontSize="sm">{content.message}</Text>
          <Box w="full" p={3} bg="rgba(245, 158, 11, 0.1)" border="1px solid rgba(245, 158, 11, 0.2)" rounded="lg">
            <Text color="#F59E0B" fontSize="xs" fontWeight="semibold">TAX FILING INFO</Text>
            <VStack spacing={1} align="start" mt={2}>
              <Text color="white" fontSize="xs">Income Type: {content.guidance?.incomeType}</Text>
              <Text color="white" fontSize="xs">ITR Form: {content.guidance?.itrForm}</Text>
              <Text color="white" fontSize="xs">Due Date: {content.guidance?.dueDate}</Text>
            </VStack>
          </Box>
          <Text color="#94A3B8" fontSize="xs" fontWeight="semibold">AVAILABLE DEDUCTIONS</Text>
          <VStack spacing={1} w="full">
            {content.guidance?.deductions?.map((ded, idx) => (
              <HStack key={idx} spacing={2}>
                <Icon as={FiCheckCircle} color="#F59E0B" boxSize={3} />
                <Text color="white" fontSize="xs">{ded}</Text>
              </HStack>
            ))}
          </VStack>
          {content.tips && (
            <VStack align="start" spacing={1} w="full" mt={2}>
              {content.tips.map((tip, idx) => (
                <HStack key={idx} spacing={2}>
                  <Icon as={FiFileText} color="#F59E0B" boxSize={3} />
                  <Text color="#94A3B8" fontSize="xs">{tip}</Text>
                </HStack>
              ))}
            </VStack>
          )}
        </VStack>
      )
    }

    return <Text color="white" fontSize="sm">{content.message || content}</Text>
  }

  return (
    <>
      {/* Floating Button */}
      <MotionBox
        position="fixed"
        bottom={6}
        right={6}
        zIndex={1000}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
      >
        <Box
          as="button"
          w="60px"
          h="60px"
          bg="linear-gradient(135deg, #3B82F6 0%, #10B981 100%)"
          rounded="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0 8px 30px rgba(59, 130, 246, 0.5)"
          onClick={() => setIsOpen(!isOpen)}
          _hover={{ transform: 'scale(1.1)' }}
          transition="all 0.3s"
        >
          <Icon as={isOpen ? FiX : FiMessageCircle} color="white" boxSize={6} />
        </Box>
        
        {/* Pulse animation */}
        {!isOpen && (
          <MotionBox
            position="absolute"
            inset={0}
            rounded="full"
            bg="linear-gradient(135deg, #3B82F6 0%, #10B981 100%)"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            pointerEvents="none"
          />
        )}
      </MotionBox>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            position="fixed"
            bottom={24}
            right={6}
            w={{ base: '90vw', md: '380px' }}
            h="500px"
            bg="rgba(15, 23, 42, 0.95)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            rounded="2xl"
            overflow="hidden"
            zIndex={999}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            boxShadow="0 25px 50px rgba(0, 0, 0, 0.5)"
          >
            {/* Header */}
            <Box
              p={4}
              bg="linear-gradient(135deg, #3B82F6 0%, #10B981 100%)"
            >
              <Flex align="center" gap={3}>
                <Box
                  w="40px"
                  h="40px"
                  bg="rgba(255, 255, 255, 0.2)"
                  rounded="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={FiBarChart2} color="white" boxSize={5} />
                </Box>
                <Box>
                  <Text color="white" fontWeight="bold">Gig-Score Assistant</Text>
                  <Text color="rgba(255, 255, 255, 0.8)" fontSize="xs">
                    AI-powered financial advisor
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* Messages */}
            <Box
              h="340px"
              overflowY="auto"
              p={4}
              css={{
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-track': { background: 'transparent' },
                '&::-webkit-scrollbar-thumb': { background: 'rgba(255, 255, 255, 0.2)', borderRadius: '4px' },
              }}
            >
              <VStack spacing={4} align="stretch">
                {messages.map((msg, idx) => (
                  <MotionFlex
                    key={idx}
                    justify={msg.type === 'user' ? 'flex-end' : 'flex-start'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      maxW="85%"
                      p={3}
                      bg={msg.type === 'user' 
                        ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)' 
                        : 'rgba(255, 255, 255, 0.05)'}
                      rounded="xl"
                      roundedBottomRight={msg.type === 'user' ? 'sm' : 'xl'}
                      roundedBottomLeft={msg.type === 'bot' ? 'sm' : 'xl'}
                    >
                      {msg.type === 'user' 
                        ? <Text color="white" fontSize="sm">{msg.content}</Text>
                        : renderBotMessage(msg.content)}
                    </Box>
                  </MotionFlex>
                ))}
                
                {isTyping && (
                  <MotionFlex
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Box
                      p={3}
                      bg="rgba(255, 255, 255, 0.05)"
                      rounded="xl"
                      roundedBottomLeft="sm"
                    >
                      <HStack spacing={1}>
                        {[0, 1, 2].map((i) => (
                          <MotionBox
                            key={i}
                            w="8px"
                            h="8px"
                            bg="#3B82F6"
                            rounded="full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </HStack>
                    </Box>
                  </MotionFlex>
                )}
                <div ref={messagesEndRef} />
              </VStack>
            </Box>

            {/* Quick Actions */}
            <Box px={4} pb={2}>
              <HStack spacing={2} overflowX="auto" pb={2} css={{
                '&::-webkit-scrollbar': { height: '4px' },
                '&::-webkit-scrollbar-track': { background: 'transparent' },
                '&::-webkit-scrollbar-thumb': { background: 'rgba(255, 255, 255, 0.2)', borderRadius: '4px' },
              }}>
                <Badge
                  as="button"
                  bg="rgba(16, 185, 129, 0.1)"
                  color="#10B981"
                  px={3}
                  py={1}
                  rounded="full"
                  cursor="pointer"
                  _hover={{ bg: 'rgba(16, 185, 129, 0.2)' }}
                  onClick={() => handleQuickAction('mutual funds')}
                  whiteSpace="nowrap"
                >
                  <Flex align="center" gap={1}>
                    <Icon as={FiTrendingUp} boxSize={3} />
                    <Text fontSize="xs">Invest</Text>
                  </Flex>
                </Badge>
                <Badge
                  as="button"
                  bg="rgba(59, 130, 246, 0.1)"
                  color="#3B82F6"
                  px={3}
                  py={1}
                  rounded="full"
                  cursor="pointer"
                  _hover={{ bg: 'rgba(59, 130, 246, 0.2)' }}
                  onClick={() => handleQuickAction('emi calculator')}
                  whiteSpace="nowrap"
                >
                  <Flex align="center" gap={1}>
                    <Icon as={FiDollarSign} boxSize={3} />
                    <Text fontSize="xs">EMI</Text>
                  </Flex>
                </Badge>
                <Badge
                  as="button"
                  bg="rgba(139, 92, 246, 0.1)"
                  color="#8B5CF6"
                  px={3}
                  py={1}
                  rounded="full"
                  cursor="pointer"
                  _hover={{ bg: 'rgba(139, 92, 246, 0.2)' }}
                  onClick={() => handleQuickAction('credit card')}
                  whiteSpace="nowrap"
                >
                  <Flex align="center" gap={1}>
                    <Icon as={FiCreditCard} boxSize={3} />
                    <Text fontSize="xs">Cards</Text>
                  </Flex>
                </Badge>
                <Badge
                  as="button"
                  bg="rgba(245, 158, 11, 0.1)"
                  color="#F59E0B"
                  px={3}
                  py={1}
                  rounded="full"
                  cursor="pointer"
                  _hover={{ bg: 'rgba(245, 158, 11, 0.2)' }}
                  onClick={() => handleQuickAction('savings goal')}
                  whiteSpace="nowrap"
                >
                  <Flex align="center" gap={1}>
                    <Icon as={FiTarget} boxSize={3} />
                    <Text fontSize="xs">Save</Text>
                  </Flex>
                </Badge>
                <Badge
                  as="button"
                  bg="rgba(6, 182, 212, 0.1)"
                  color="#06B6D4"
                  px={3}
                  py={1}
                  rounded="full"
                  cursor="pointer"
                  _hover={{ bg: 'rgba(6, 182, 212, 0.2)' }}
                  onClick={() => handleQuickAction('insurance')}
                  whiteSpace="nowrap"
                >
                  <Flex align="center" gap={1}>
                    <Icon as={FiShield} boxSize={3} />
                    <Text fontSize="xs">Insurance</Text>
                  </Flex>
                </Badge>
                <Badge
                  as="button"
                  bg="rgba(239, 68, 68, 0.1)"
                  color="#EF4444"
                  px={3}
                  py={1}
                  rounded="full"
                  cursor="pointer"
                  _hover={{ bg: 'rgba(239, 68, 68, 0.2)' }}
                  onClick={() => handleQuickAction('tax')}
                  whiteSpace="nowrap"
                >
                  <Flex align="center" gap={1}>
                    <Icon as={FiFileText} boxSize={3} />
                    <Text fontSize="xs">Tax</Text>
                  </Flex>
                </Badge>
              </HStack>
            </Box>

            {/* Input */}
            <Box p={4} pt={0}>
              <Flex
                bg="rgba(255, 255, 255, 0.05)"
                rounded="xl"
                border="1px solid rgba(255, 255, 255, 0.1)"
                overflow="hidden"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about investments, loans..."
                  border="none"
                  bg="transparent"
                  color="white"
                  _placeholder={{ color: '#64748B' }}
                  _focus={{ boxShadow: 'none' }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Box
                  as="button"
                  px={4}
                  bg="linear-gradient(135deg, #3B82F6 0%, #10B981 100%)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  onClick={handleSend}
                  _hover={{ opacity: 0.9 }}
                  transition="all 0.2s"
                >
                  <Icon as={FiSend} color="white" boxSize={5} />
                </Box>
              </Flex>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot
