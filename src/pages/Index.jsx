import React, { useEffect, useState } from "react";
import { Container, VStack, Text, Image, Spinner, Box, Heading } from "@chakra-ui/react";
import axios from "axios";

const NASA_API_KEY = "DEMO_KEY"; // Replace with your actual NASA API key
const NASA_APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

const Index = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(NASA_APOD_URL)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Text fontSize="2xl" color="red.500">Error fetching data from NASA API</Text>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="xl">{data.title}</Heading>
        <Image src={data.url} alt={data.title} boxSize="500px" objectFit="cover" />
        <Text fontSize="md">{data.explanation}</Text>
        <Text fontSize="sm" color="gray.500">Date: {data.date}</Text>
      </VStack>
    </Container>
  );
};

export default Index;