#!/bin/bash
echo "clean build & run android"
rm platforms/android/build/outputs/apk/*.apk
ionic build android
ionic run android 
