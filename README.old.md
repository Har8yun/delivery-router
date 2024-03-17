# Frontend React Assignment

## Overview
Your task is to create a simplified version of our Driver Web App (DWA). This app assists a delivery driver in managing and completing parcel deliveries to various addresses.

## Design Reference
Please refer to this Figma design for the visual layout of the application: 
http://tinyurl.com/3ue2mjey

Password: '20240228'

❗ You can only use [Material Design UI components](https://material-ui.com/).

## Specific Tasks
1. **Visual Design** 
<br>Your application should closely resemble the provided design.

2. **Stops List** 
<br>Please refer to the [stops_list.json](https://gitlab.routetitan.com/hiring/react-assignment/-/blob/master/stops_list.json?ref_type=heads) file provided in this project to import the list of delivery stops. This file contains all necessary details for each stop, including sequence, estimated time of arrival (ETA), time window, street address, zipcode, city, and coordinates.

3. **Navigation Feature** 
<br>On clicking the 'Navigate' icon, Google Maps will open in a new window to guide the driver from their current location to the delivery address.

4. **Completion Transition** 
<br>On clicking the 'Complete' button, please mimic the ticket transition displayed on the second screen of the design.

5. **Map View** <br>
Show all delivery locations with markers on a map and connect the markers with straight lines in sequence.
<br>- Interactive Map: use MapLibre GL JS for map interaction (markers, lines), details can be found [here](https://maplibre.org/maplibre-gl-js/docs/)
<br>- Tiles: Use `https://tiles.stadiamaps.com/styles/osm_bright.json` as the style URL in MapLibre GL JS

6. **Marker Transition** 
<br>Change the marker's color on the map once a delivery is marked as "Completed".

## Time Constraint
Please do not spend more than 8 hours on this assignment.

## Submission Process
- Compile your project into a .zip file.
- Email it to careers@routetitan.com.
- Use the subject line: **"Frontend React Assignment Submission (FE-20240228) - You Full Name"**
- Ensure your submission is within the given deadline.

Good luck, and we look forward to seeing your creation!
