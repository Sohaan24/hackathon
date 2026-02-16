import { useState, useCallback } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  HStack,
  Icon,
  Progress,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUploadCloud,
  FiFile,
  FiCheckCircle,
  FiArrowLeft,
  FiArrowRight,
  FiSmartphone,
  FiZap,
  FiHome,
  FiMusic,
  FiTrash2,
  FiShield,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

// Animated gradient background (same as Dashboard)
const AnimatedBackground = () => (
  <Box position="fixed" top={0} left={0} right={0} bottom={0} zIndex={-1} overflow="hidden">
    <Box position="absolute" inset={0} bg="linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #134e4a 100%)" />
    <MotionBox
      position="absolute"
      top="-20%"
      left="-10%"
      w="50vw"
      h="50vw"
      borderRadius="full"
      bg="radial-gradient(circle, rgba(49, 151, 149, 0.4) 0%, transparent 70%)"
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
      bg="radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)"
      filter="blur(80px)"
      animate={{ x: [0, -80, 0], y: [0, -60, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
    />
    <MotionBox
      position="absolute"
      top="40%"
      left="50%"
      w="40vw"
      h="40vw"
      borderRadius="full"
      bg="radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)"
      filter="blur(60px)"
      animate={{ x: [0, 60, -40, 0], y: [0, -40, 40, 0] }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
    />
  </Box>
);

// Glassmorphism card
const GlassCard = ({ children, delay = 0, ...props }) => (
  <MotionBox
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    bg="rgba(255, 255, 255, 0.08)"
    backdropFilter="blur(20px)"
    border="1px solid rgba(255, 255, 255, 0.15)"
    borderRadius="3xl"
    overflow="hidden"
    position="relative"
    _before={{
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "1px",
      bg: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
    }}
    {...props}
  >
    {children}
  </MotionBox>
);

// Data source selection card
const DataSourceCard = ({ icon, title, description, isSelected, onToggle }) => (
  <Box
    as="button"
    onClick={onToggle}
    w="100%"
    p={4}
    bg={isSelected ? "rgba(52, 211, 153, 0.15)" : "rgba(255, 255, 255, 0.05)"}
    border="2px solid"
    borderColor={isSelected ? "#34d399" : "rgba(255, 255, 255, 0.1)"}
    borderRadius="xl"
    textAlign="left"
    transition="all 0.3s"
    _hover={{
      borderColor: isSelected ? "#34d399" : "rgba(255, 255, 255, 0.3)",
      bg: isSelected ? "rgba(52, 211, 153, 0.2)" : "rgba(255, 255, 255, 0.08)",
      transform: "translateY(-2px)",
    }}
  >
    <Flex align="center" gap={4}>
      <Flex
        w={12}
        h={12}
        bg={isSelected ? "rgba(52, 211, 153, 0.3)" : "rgba(255, 255, 255, 0.1)"}
        borderRadius="xl"
        align="center"
        justify="center"
        transition="all 0.3s"
      >
        <Icon
          as={icon}
          boxSize={6}
          color={isSelected ? "#34d399" : "whiteAlpha.600"}
        />
      </Flex>
      <Box flex={1}>
        <Text fontWeight="semibold" color="white">
          {title}
        </Text>
        <Text fontSize="sm" color="whiteAlpha.500">
          {description}
        </Text>
      </Box>
      <Box
        w={6}
        h={6}
        borderRadius="full"
        border="2px solid"
        borderColor={isSelected ? "#34d399" : "whiteAlpha.300"}
        bg={isSelected ? "#34d399" : "transparent"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="all 0.3s"
      >
        {isSelected && <Icon as={FiCheckCircle} color="white" boxSize={4} />}
      </Box>
    </Flex>
  </Box>
);

// File item component with delete
const FileItem = ({ file, onDelete, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MotionBox
      layout
      initial={{ opacity: 0, x: -20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.8 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      p={4}
      bg="rgba(255, 255, 255, 0.05)"
      borderRadius="xl"
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.1)"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
    >
      <Flex align="center" gap={4}>
        {/* File Icon */}
        <Box
          w={12}
          h={12}
          borderRadius="xl"
          bg="rgba(52, 211, 153, 0.2)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={FiFile} color="#34d399" boxSize={5} />
        </Box>

        {/* File Info */}
        <Box flex={1}>
          <Text fontWeight="semibold" color="white" fontSize="sm" noOfLines={1}>
            {file.name}
          </Text>
          <Text fontSize="xs" color="whiteAlpha.500">
            {(file.size / 1024).toFixed(1)} KB
          </Text>
        </Box>

        {/* Progress / Success */}
        <Flex align="center" gap={3} minW="120px">
          <Box flex={1}>
            <Progress.Root value={100} size="sm">
              <Progress.Track bg="rgba(255, 255, 255, 0.1)" borderRadius="full" h="6px">
                <Progress.Range bg="linear-gradient(90deg, #34d399, #06b6d4)" borderRadius="full" />
              </Progress.Track>
            </Progress.Root>
          </Box>
          <Text fontSize="xs" color="#34d399" fontWeight="semibold">
            100%
          </Text>
        </Flex>

        {/* Delete Button */}
        <MotionBox
          animate={{ opacity: isHovered ? 1 : 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Box
            as="button"
            p={2}
            borderRadius="lg"
            bg="rgba(239, 68, 68, 0.1)"
            border="1px solid"
            borderColor="rgba(239, 68, 68, 0.3)"
            cursor="pointer"
            onClick={() => onDelete(file.id)}
            _hover={{ bg: "rgba(239, 68, 68, 0.2)", borderColor: "#ef4444" }}
            transition="all 0.2s"
          >
            <Icon as={FiTrash2} color="#ef4444" boxSize={4} />
          </Box>
        </MotionBox>
      </Flex>
    </MotionBox>
  );
};

const DataUpload = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dataSources, setDataSources] = useState({
    spotify: false,
    upi: false,
    utility: false,
  });

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(
      (file) =>
        file.type === "application/pdf" ||
        file.type === "text/csv" ||
        file.name.endsWith(".csv") ||
        file.name.endsWith(".pdf")
    );

    if (validFiles.length > 0) {
      setIsUploading(true);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setUploadedFiles((prevFiles) => [
              ...prevFiles,
              ...validFiles.map((f, idx) => ({
                id: Date.now() + idx,
                name: f.name,
                size: f.size,
                type: f.type,
              })),
            ]);
            return 100;
          }
          return prev + 8;
        });
      }, 100);
    }
  };

  const handleDeleteFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const toggleDataSource = (source) => {
    setDataSources((prev) => ({
      ...prev,
      [source]: !prev[source],
    }));
  };

  const canProceed =
    uploadedFiles.length > 0 || Object.values(dataSources).some((v) => v);

  const handleAnalyze = () => {
    navigate("/dashboard");
  };

  return (
    <Box minH="100vh" position="relative">
      <AnimatedBackground />

      {/* Header */}
      <Box
        position="sticky"
        top={0}
        zIndex={100}
        bg="rgba(15, 23, 42, 0.8)"
        backdropFilter="blur(20px)"
        borderBottom="1px solid"
        borderColor="whiteAlpha.100"
      >
        <Container maxW="2xl" py={4}>
          <Flex justify="space-between" align="center">
            <Button
              variant="ghost"
              color="whiteAlpha.700"
              onClick={() => navigate("/")}
              _hover={{ color: "white", bg: "rgba(255,255,255,0.1)" }}
              leftIcon={<FiArrowLeft />}
            >
              Back
            </Button>
            <HStack gap={2}>
              <Box
                w={10}
                h={10}
                borderRadius="xl"
                bg="linear-gradient(135deg, #34d399 0%, #06b6d4 100%)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="0 0 25px rgba(52, 211, 153, 0.5)"
              >
                <Text color="white" fontWeight="bold" fontSize="lg">
                  G
                </Text>
              </Box>
              <Text fontWeight="bold" fontSize="xl" color="white">
                GigScore
              </Text>
            </HStack>
            <Box w="80px" />
          </Flex>
        </Container>
      </Box>

      {/* Main Content - CENTERED */}
      <Container maxW="2xl" py={12} centerContent>
        <VStack gap={8} w="100%" align="stretch">
          {/* Progress Steps */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Flex justify="center" mb={2}>
              <HStack gap={4}>
                {[
                  { num: 1, label: "Upload Data", active: true },
                  { num: 2, label: "AI Analysis", active: false },
                  { num: 3, label: "View Score", active: false },
                ].map((step, i) => (
                  <Flex key={i} align="center" gap={2}>
                    <Box
                      w={10}
                      h={10}
                      borderRadius="full"
                      bg={step.active ? "linear-gradient(135deg, #34d399 0%, #06b6d4 100%)" : "rgba(255,255,255,0.1)"}
                      color={step.active ? "white" : "whiteAlpha.500"}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontWeight="bold"
                      fontSize="sm"
                      boxShadow={step.active ? "0 0 20px rgba(52, 211, 153, 0.4)" : "none"}
                    >
                      {step.num}
                    </Box>
                    <Text fontWeight="medium" color={step.active ? "white" : "whiteAlpha.400"} display={{ base: "none", md: "block" }}>
                      {step.label}
                    </Text>
                    {i < 2 && <Box w={8} h="2px" bg="rgba(255,255,255,0.1)" display={{ base: "none", md: "block" }} />}
                  </Flex>
                ))}
              </HStack>
            </Flex>
          </MotionBox>

          {/* Title */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            textAlign="center"
          >
            <Heading
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="800"
              color="white"
              mb={3}
            >
              Upload Your Financial Data
            </Heading>
            <Text color="whiteAlpha.600" fontSize="lg">
              We'll analyze your data to generate your personalized GigScore
            </Text>
          </MotionBox>

          {/* Drag & Drop Zone */}
          <GlassCard delay={0.2} p={0}>
            <Box
              as="label"
              display="block"
              cursor="pointer"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf,.csv"
                multiple
                onChange={handleFileInput}
                style={{ display: "none" }}
              />
              <Box
                p={10}
                bg={isDragging ? "rgba(52, 211, 153, 0.1)" : "transparent"}
                border="2px dashed"
                borderColor={isDragging ? "#34d399" : "rgba(255, 255, 255, 0.2)"}
                borderRadius="2xl"
                m={4}
                textAlign="center"
                transition="all 0.3s"
                position="relative"
                overflow="hidden"
                _hover={{
                  borderColor: "#34d399",
                  bg: "rgba(52, 211, 153, 0.05)",
                }}
                sx={isDragging ? {
                  boxShadow: "0 0 30px rgba(52, 211, 153, 0.3), inset 0 0 30px rgba(52, 211, 153, 0.1)",
                } : {}}
              >
                {/* Glow effect when dragging */}
                {isDragging && (
                  <Box
                    position="absolute"
                    inset={0}
                    bg="radial-gradient(circle at center, rgba(52, 211, 153, 0.2) 0%, transparent 70%)"
                    pointerEvents="none"
                  />
                )}

                {isUploading ? (
                  <VStack gap={4}>
                    <MotionBox
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Box
                        w={16}
                        h={16}
                        borderRadius="full"
                        bg="rgba(52, 211, 153, 0.2)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={FiUploadCloud} boxSize={8} color="#34d399" />
                      </Box>
                    </MotionBox>
                    <Text fontWeight="semibold" color="white">
                      Uploading...
                    </Text>
                    <Box w="200px">
                      <Progress.Root value={uploadProgress}>
                        <Progress.Track bg="rgba(255,255,255,0.1)" borderRadius="full" h="8px">
                          <Progress.Range bg="linear-gradient(90deg, #34d399, #06b6d4)" borderRadius="full" />
                        </Progress.Track>
                      </Progress.Root>
                    </Box>
                    <Text fontSize="sm" color="whiteAlpha.600">
                      {uploadProgress}% complete
                    </Text>
                  </VStack>
                ) : (
                  <VStack gap={4} position="relative">
                    <MotionBox
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Box
                        w={20}
                        h={20}
                        borderRadius="full"
                        bg="rgba(52, 211, 153, 0.15)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="2px solid"
                        borderColor="rgba(52, 211, 153, 0.3)"
                      >
                        <Icon as={FiUploadCloud} boxSize={10} color="#34d399" />
                      </Box>
                    </MotionBox>
                    <VStack gap={1}>
                      <Text fontWeight="bold" color="white" fontSize="xl">
                        Drag & drop your bank statements
                      </Text>
                      <Text color="whiteAlpha.500">
                        or{" "}
                        <Text as="span" color="#34d399" fontWeight="semibold">
                          browse files
                        </Text>
                      </Text>
                    </VStack>
                    <Text fontSize="sm" color="whiteAlpha.400">
                      Supports PDF, CSV • Max 10MB per file
                    </Text>
                  </VStack>
                )}
              </Box>
            </Box>
          </GlassCard>

          {/* Uploaded Files List */}
          <AnimatePresence mode="popLayout">
            {uploadedFiles.length > 0 && (
              <MotionBox
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <GlassCard delay={0} p={4}>
                  <Text color="white" fontWeight="bold" mb={4} px={2}>
                    Uploaded Files ({uploadedFiles.length})
                  </Text>
                  <VStack gap={3} align="stretch">
                    <AnimatePresence mode="popLayout">
                      {uploadedFiles.map((file, index) => (
                        <FileItem
                          key={file.id}
                          file={file}
                          index={index}
                          onDelete={handleDeleteFile}
                        />
                      ))}
                    </AnimatePresence>
                  </VStack>
                </GlassCard>
              </MotionBox>
            )}
          </AnimatePresence>

          {/* Alternative Data Sources */}
          <GlassCard delay={0.3} p={6}>
            <Text fontWeight="bold" color="white" mb={4}>
              Alternative Data Sources{" "}
              <Text as="span" fontWeight="normal" color="whiteAlpha.500">
                (Optional)
              </Text>
            </Text>
            <VStack gap={3} align="stretch">
              <DataSourceCard
                icon={FiMusic}
                title="Connect Spotify Bill"
                description="Verify your subscription payment history"
                isSelected={dataSources.spotify}
                onToggle={() => toggleDataSource("spotify")}
              />
              <DataSourceCard
                icon={FiSmartphone}
                title="Link UPI ID"
                description="Analyze your digital payment patterns"
                isSelected={dataSources.upi}
                onToggle={() => toggleDataSource("upi")}
              />
              <DataSourceCard
                icon={FiHome}
                title="Verify Utility Bill"
                description="Add electricity, water, or gas bill records"
                isSelected={dataSources.utility}
                onToggle={() => toggleDataSource("utility")}
              />
            </VStack>
          </GlassCard>

          {/* Security Note */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Box
              p={4}
              bg="rgba(52, 211, 153, 0.1)"
              borderRadius="xl"
              border="1px solid"
              borderColor="rgba(52, 211, 153, 0.2)"
            >
              <Flex justify="center" align="center" gap={3}>
                <Icon as={FiShield} color="#34d399" boxSize={5} />
                <Text fontSize="sm" color="whiteAlpha.700">
                  Your data is encrypted with bank-grade 256-bit SSL encryption
                </Text>
              </Flex>
            </Box>
          </MotionBox>

          {/* CTA Button */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              w="100%"
              size="lg"
              bg={canProceed ? "linear-gradient(135deg, #34d399 0%, #06b6d4 100%)" : "rgba(255,255,255,0.1)"}
              color="white"
              borderRadius="xl"
              py={8}
              fontSize="lg"
              fontWeight="bold"
              disabled={!canProceed}
              _hover={
                canProceed
                  ? {
                      transform: "translateY(-3px)",
                      boxShadow: "0 10px 40px rgba(52, 211, 153, 0.4)",
                    }
                  : {}
              }
              _disabled={{
                cursor: "not-allowed",
                opacity: 0.5,
              }}
              transition="all 0.3s"
              onClick={handleAnalyze}
              rightIcon={<FiArrowRight />}
            >
              Analyze My Data
            </Button>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default DataUpload;