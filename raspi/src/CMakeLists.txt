cmake_minimum_required (VERSION 2.6)
project (raspi)

set (CMAKE_CXX_STANDARD 11)

add_executable(raspi main.cpp)

file(
  GLOB_RECURSE
  source_files
  src/*
)

set(EXECUTABLE_OUTPUT_PATH ../bin/${CMAKE_BUILD_TYPE})
