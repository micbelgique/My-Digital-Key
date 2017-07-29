cmake_minimum_required (VERSION 2.6)
project (raspi)

set (CMAKE_CXX_STANDARD 11)

include(FindBoost)
find_package(
    Boost
    1.54.0
    REQUIRED
)

include_directories(${Boost_INCLUDE_DIRS})
link_directories(${Boost_LIBRARY_DIRS})


add_executable(raspi main.cpp)
include_directories(../lib/libnfc/include)
include_directories(../lib/libnfc/libnfc/chips)

link_directories(/usr/lib/arm-linux-gnueabihf/)

file(
  GLOB_RECURSE
  source_files
  src/*
)

set(EXECUTABLE_OUTPUT_PATH ../bin/${CMAKE_BUILD_TYPE})

target_link_libraries(raspi nfc usb)
