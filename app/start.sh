#!/bin/bash

export JAVA_HOME=/home/moffa/Bureau/jdk1.8.0_144
export ANDROID_HOME=/home/moffa/Bureau/android-sdk
export LD_LIBRARY_PATH=/home/moffa/Bureau/jdk1.8.0_144/jre/lib/amd64/jli/:$LD_LIBRARY_PATH
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$JAVA_HOME/bin

echo $LD_LIBRARY_PATH

android -v
meteor yarn mobile
