# Standard ROS 2 header for timestamp and coordinate frame
std_msgs/Header header

# Current measured distance to nearest obstacle in meters
float32 distance_m

# Minimum and maximum operational range of ultrasonic transducer
float32 min_range_m
float32 max_range_m

# Digital safety flag: true if distance_m <= safety threshold
bool obstacle_detected
