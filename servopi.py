import RPi.GPIO as GPIO
import time

#Set GPIO numbering mode
GPIO.setmode(GPIO.BOARD)

#Set pin 11 as an output
GPIO.setup(11,GPIO.OUT)
servo = GPIO.PWM(11,50)

#START
servo.start(0)
print("Waiting for 1 second")
time.sleep(1)

#gira 90 grados
servo.ChangeDutyCycle(12)
time.sleep(1)

servo.ChangeDutyCycle(2)
time.sleep(1)
servo.ChangeDutyCycle(0)

#cleanup
servo.stop()
GPIO.cleanup()