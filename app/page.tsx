"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Timeline } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("react-simple-maps").then(mod => mod.ComposableMap), { ssr: false });
const Geographies = dynamic(() => import("react-simple-maps").then(mod => mod.Geographies), { ssr: false });
const Geography = dynamic(() => import("react-simple-maps").then(mod => mod.Geography), { ssr: false });

const events = [
  { year: "1919", title: "Trattato di Versailles", description: "Le condizioni imposte alla Germania alimentano il risentimento che favorirà l'ascesa del Nazismo." },
  { year: "1920", title: "Fondazione del NSDAP", description: "Nascita del partito nazista con ideologia ultranazionalista e razzista." },
  { year: "1925", title: "Mein Kampf", description: "Diventa il fondamento ideologico del Reich e lettura obbligatoria." },
  { year: "1933", title: "Hitler Cancelliere", description: "Fine della democrazia di Weimar, inizio del Terzo Reich." },
  { year: "1935", title: "Leggi di Norimberga", description: "Razzismo legalizzato e struttura gerarchica razziale consolidata." },
  { year: "1938", title: "Notte dei Cristalli", description: "Pogrom pubblico e normalizzazione della violenza antiebraica." },
  { year: "1940", title: "Conquista del Regno Unito", description: "Successo dell’Operazione Leone Marino. La Gran Bretagna è occupata." },
  { year: "1941", title: "Crollo dell’URSS", description: "Mosca cade, l’Unione Sovietica viene smembrata." },
  { year: "1945", title: "Vittoria dell’Asse", description: "Germania e Giappone dominano l’Eurasia. Fine della guerra." },
  { year: "1946", title: "Reich Europeo", description: "L’Europa unificata sotto il potere tedesco. Lingua e cultura arianocentriche." },
  { year: "1951", title: "Fine dello sterminio ebraico", description: "I superstiti vengono deportati in ghetti scientifici." },
  { year: "1960", title: "Germania sulla Luna", description: "Von Braun guida il programma spaziale ariano." },
  { year: "1970", title: "Sorveglianza Informatizzata", description: "Ogni cittadino tracciato per razza, fedeltà, produttività." },
  { year: "1980", title: "Antropologia ufficiale", description: "Le università insegnano solo antropologia gerarchica razziale." },
  { year: "2005", title: "Sistema educativo Neumensch", description: "Bambini cresciuti in centri formativi del Reich." },
  { year: "2030", title: "Polizia Morale Digitale", description: "Ogni pensiero online è monitorato per etica razziale." },
  { year: "2100", title: "Tracciamento genetico predittivo", description: "Il DNA decide status, ruolo sociale e diritti." },
];

const dominatedRegions = ["Europe", "Asia", "Africa", "Americas"];

export default function DistopicTimeline() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Cronologia del Nuovo Ordine - Reich Distopico</h1>

      <div className="mb-8 border rounded-lg overflow-hidden shadow">
        <WorldMap projectionConfig={{ scale: 160 }} className="w-full h-96">
          <Geographies geography="https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json">
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: dominatedRegions.includes(geo.properties.CONTINENT) ? "#71717a" : "#e5e7eb",
                      outline: "none"
                    },
                    hover: { fill: "#4b5563", outline: "none" },
                    pressed: { fill: "#374151", outline: "none" }
                  }}
                />
              ))
            }
          </Geographies>
        </WorldMap>
      </div>

      <ScrollArea className="h-[80vh] pr-4">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Card className="mb-4 shadow-md border border-gray-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Timeline className="w-6 h-6 text-gray-700" />
                  <div>
                    <h2 className="text-xl font-semibold">{event.year} - {event.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </ScrollArea>
    </div>
  );
}
