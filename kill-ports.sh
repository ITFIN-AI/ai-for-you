#!/bin/bash

echo "Killing processes on ports 3000 and 3001..."

# Find and kill processes on port 3000 using both lsof and fuser
echo "Checking port 3000..."
if lsof -t -i:3000 > /dev/null 2>&1; then
  pid_3000=$(lsof -t -i:3000)
  echo "Killing process on port 3000 (lsof): $pid_3000"
  kill -9 $pid_3000
elif fuser 3000/tcp > /dev/null 2>&1; then
  echo "Killing process on port 3000 (fuser):"
  fuser -k -n tcp 3000
else
  echo "No process found on port 3000"
fi

# Find and kill processes on port 3001 using both lsof and fuser
echo "Checking port 3001..."
if lsof -t -i:3001 > /dev/null 2>&1; then
  pid_3001=$(lsof -t -i:3001)
  echo "Killing process on port 3001 (lsof): $pid_3001"
  kill -9 $pid_3001
elif fuser 3001/tcp > /dev/null 2>&1; then
  echo "Killing process on port 3001 (fuser):"
  fuser -k -n tcp 3001
else
  echo "No process found on port 3001"
fi

# Additional check with netstat
echo "Checking with netstat..."
if command -v netstat &> /dev/null; then
  netstat_3000=$(netstat -tulpn 2>/dev/null | grep ":3000 ")
  if [ -n "$netstat_3000" ]; then
    echo "Found process on port 3000 with netstat: $netstat_3000"
    pid_3000=$(echo "$netstat_3000" | awk '{print $7}' | cut -d'/' -f1)
    if [ -n "$pid_3000" ]; then
      echo "Killing process $pid_3000"
      kill -9 $pid_3000
    fi
  fi
  
  netstat_3001=$(netstat -tulpn 2>/dev/null | grep ":3001 ")
  if [ -n "$netstat_3001" ]; then
    echo "Found process on port 3001 with netstat: $netstat_3001"
    pid_3001=$(echo "$netstat_3001" | awk '{print $7}' | cut -d'/' -f1)
    if [ -n "$pid_3001" ]; then
      echo "Killing process $pid_3001"
      kill -9 $pid_3001
    fi
  fi
fi

echo "Done!" 