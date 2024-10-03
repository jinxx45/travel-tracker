import Titlebar from "./components/ui/titlebar";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
                        <li>Dave's House</li>
                        <li>Badminton Court</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3">Column 2</div>
        </div>
      </div>
    </div>
  );
};

export default App;
