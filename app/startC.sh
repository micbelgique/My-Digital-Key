#!/bin/bash

export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_144.jdk/Contents/Home
export ANDROID_HOME=/Users/corentin/Desktop/android-sdk
export LD_LIBRARY_PATH=/Library/Java/JavaVirtualMachines/jdk1.8.0_144.jdk/Contents/Home/jre/lib/amd64/jli/:$LD_LIBRARY_PATH
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$JAVA_HOME/bin

echo $LD_LIBRARY_PATH

# android -v
meteor yarn mobile --verbose
