import cv2
import numpy as np

img = cv2.imread('/Users/mursaleensakoskar/Desktop/DisposalGrid/disposalgrid-monorepo/site/public/logo.png', cv2.IMREAD_GRAYSCALE)
# The image is large (5.7MB). Let's threshold it.
# The logo is dark on a light background.
_, thresh = cv2.threshold(img, 128, 255, cv2.THRESH_BINARY_INV)

# Find contours
contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

print(f"Found {len(contours)} contours")
# Sort contours by area
contours = sorted(contours, key=cv2.contourArea, reverse=True)

# Print bounding boxes of top 20 contours to identify the logo parts
for i in range(min(20, len(contours))):
    x,y,w,h = cv2.boundingRect(contours[i])
    print(f"Contour {i}: x={x}, y={y}, w={w}, h={h}, area={cv2.contourArea(contours[i])}")

