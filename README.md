# CHUUMON-CENTER

### How to Run NodeJS Application as a Windows Service
- Step-1: Download NSSM
Step-2: Renaming and placing the NSSM folder in C: drive
Step-3: Creating a Service for your Nodejs Application

Ex:
~~~
nssm install chuumon-center-v1.0 "C:\Program Files\nodejs\node.exe" "C:\Users\AnMTD\Documents\Projects\chuumon system\chuumon-center"
nssm set chuumon-center-v1.0 AppDirectory "C:\Users\AnMTD\Documents\Projects\chuumon system\chuumon-center"
nssm set chuumon-center-v1.0 AppParameters "main.js" 
nssm start chuumon-center-v1.0
~~~