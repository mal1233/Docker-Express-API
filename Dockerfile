# 1. Use an official Node runtime as the base image
FROM node:18

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json first (for caching)
COPY package.json .

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of your backend code into the container
COPY . .

# 6. Expose port 3000 (the port your Express app runs on)
EXPOSE 3000

# 7. Command to start the server
CMD ["node", "server.js"]
