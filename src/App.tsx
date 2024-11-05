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
  type: string;
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
        // Create an array of promises for the API calls
        const promises = [
          fetch("api/footprints/getAllMyFootPrints", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ type: null }),
          }),
          fetch("api/geoInvitations/getAllGeoInvitations", {
            // Updated endpoint for geo invitations
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }),
        ];

        // Use Promise.all to wait for all the promises to resolve
        const responses = await Promise.all(promises);

        // Check if both responses are OK
        responses.forEach((response, index) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch from API at index ${index}`);
          }
        });

        // Parse the JSON from both responses
        const [locations, geoInvitationsData] = await Promise.all(
          responses.map((response) => response.json())
        );

        // Handle the fetched data
        handleFetchedLocations(locations);
        setGeoInvitations(geoInvitationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleFetchedLocations = (locations: myFootPrintsType[]) => {
    // Process the data as needed
    console.log(locations);
    const saved: myFootPrintsType[] = [];
    const footprints: myFootPrintsType[] = [];

    locations.forEach((item: myFootPrintsType) => {
      switch (item.type) {
        case "savedLocation":
          saved.push(item);
          break;
        case "myFootPrint":
          footprints.push(item);
          break;
        default:
          throw new Error("Type is invalid. Please contact support");
      }
    });
    setSavedLocations(saved);
    setMyFootPrints(footprints);
  };

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
                        {myFootPrints.map((item: myFootPrintsType) => {
                          return <li>{item.locationName}</li>;
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="savedLocations">
                    <AccordionTrigger>Saved Locations</AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {savedLocations.map((item: myFootPrintsType) => {
                          return <li>{item.locationName}</li>;
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="geoInvitations">
                    <AccordionTrigger>Geo Invitations</AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {geoInvitations.map((item: geoInvitationType) => {
                          return <li>{item.invitationDescription}</li>;
                        })}
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
