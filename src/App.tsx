import Titlebar from "./components/ui/titlebar";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MapComponent from "./components/ui/MapComponent";
import DescriptionComponent from "./components/ui/DescriptionComponent";

interface myFootPrintsType {
  locationName: string;
  locationDescription: string;
  geolocation: string;
  rating: number;
}

interface geoInvitationType {
  invitationFrom: string;
  invitationDescription: string;
  geolocation: string;
  eventDate: Date;
}

const App = () => {
  const [myFootPrints, setMyFootPrints] = useState<myFootPrintsType[]>([]);
  const [savedLocations, setSavedLocations] = useState<myFootPrintsType[]>([]);
  const [geoInvitations, setGeoInvitations] = useState<geoInvitationType[]>([]);

  const [selectedLocationTitle, setSelectedLocationTitle] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentCoordinates, setCurrentCoordinates] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("api/footprints/getAllMyFootPrints", {
          method: "POST", // Specify the POST method
          headers: {
            "Content-Type": "application/json", // Indicate the content type
          },
          body: JSON.stringify({ type: null }), // Include the body, here 'type' can be null
        });

        if (!response.ok) {
          throw new Error("Failed to fetch locations from server");
        }

        const data = await response.json();
        console.log(data); // Handle the fetched data
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="app-container ">
      <div className="app">
        <div className="flex flex-wrap">
          <div className="left bar w-full md:w-1/3  bg-blue-400 h-screen  text-white ">
            <div className="left-bar-container p-4">
              <div className="left-bar-title">
                <Titlebar title="Travel Tracker" logourl="earth-globe.png" />
              </div>
              <div className="left-bar-content">
                <Accordion type="single" collapsible>
                  <AccordionItem value="myFootprints">
                    <AccordionTrigger>My Footprints</AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        <li>Chennai</li>
                        <li>Bangalore</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="savedLocations">
                    <AccordionTrigger>Saved Locations</AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        <li>Dave's House</li>
                        <li>Badminton Court</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="geoInvitations">
                    <AccordionTrigger>Geo Invitations</AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        <li>Dan's Birthday Party</li>
                        <li>Graheeth's Bachelors Party</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <DescriptionComponent
              selectedLocation="Chennai"
              description="Chennai is a great place where my office is located"
            />
            <MapComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
