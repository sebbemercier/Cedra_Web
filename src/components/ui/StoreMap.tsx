"use client";

import React, { useState, useRef } from "react";
import { Map, MapMarker, MapControls, MarkerContent, MapPopup, useMap, type MapRef } from "@/components/ui/map";
import { MapPin, Navigation, Clock, Phone, X, Locate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stores = [
  {
    id: 1,
    name: "Bruxelles Centre",
    address: "Rue de la Loi 123, 1000 Bruxelles",
    coords: { lat: 50.8466, lng: 4.3800 },
    hours: "08:00 - 18:00",
    phone: "+32 2 123 45 67"
  },
  {
    id: 2,
    name: "Anvers Nord",
    address: "Mechelsesteenweg 456, 2018 Anvers",
    coords: { lat: 51.1900, lng: 4.4100 },
    hours: "08:30 - 17:30",
    phone: "+32 3 987 65 43"
  }
];

export default function StoreMap() {
  const [selectedStore, setSelectedStore] = useState<typeof stores[0] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const mapRef = useRef<MapRef>(null);

  // Haversine formula to calculate distance between two points
  const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); 
    var dLon = deg2rad(lon2 - lon1); 
    var a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    var d = R * c; // Distance in km
    return d;
  }

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180)
  }

  const handleLocateNearest = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        let nearestStore = null;
        let minDistance = Infinity;

        stores.forEach(store => {
            const distance = getDistanceFromLatLonInKm(userLat, userLng, store.coords.lat, store.coords.lng);
            if (distance < minDistance) {
                minDistance = distance;
                nearestStore = store;
            }
        });

        if (nearestStore) {
            setSelectedStore(nearestStore);
            if (mapRef.current) {
                mapRef.current.flyTo({
                    center: [(nearestStore as any).coords.lng, (nearestStore as any).coords.lat],
                    zoom: 12,
                    duration: 2000
                });
            }
        }
        setIsLocating(false);
      }, (error) => {
        console.error("Error getting location", error);
        setIsLocating(false);
        alert("Impossible de vous localiser. Veuillez vérifier vos paramètres.");
      });
    } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
        setIsLocating(false);
    }
  };

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden border border-white/10 bg-background/50">
      
      {/* Custom Locate Button Overlay */}
      <div className="absolute top-4 left-4 z-10">
        <Button 
            onClick={handleLocateNearest}
            disabled={isLocating}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-xl"
        >
            {isLocating ? (
                <span className="animate-spin mr-2">⏳</span>
            ) : (
                <Locate size={16} className="mr-2 text-cedra-500" />
            )}
            {isLocating ? "Localisation..." : "Magasin le plus proche"}
        </Button>
      </div>

      <Map 
        ref={mapRef}
        initialViewState={{
          longitude: 4.3517,
          latitude: 51.0500,
          zoom: 8
        }}
        theme="dark"
      >
        <MapControls position="bottom-right" />

        {stores.map((store) => (
          <MapMarker
            key={store.id}
            latitude={store.coords.lat}
            longitude={store.coords.lng}
            onClick={() => setSelectedStore(store)}
          >
            <MarkerContent>
              <div className="relative group cursor-pointer">
                 <div className={cn(
                    "absolute -inset-2 bg-cedra-500/20 rounded-full animate-ping pointer-events-none transition-opacity",
                    selectedStore?.id === store.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                 )} />
                 <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg border-2 transition-all duration-300",
                    selectedStore?.id === store.id 
                        ? "bg-white text-cedra-500 border-cedra-500 scale-125 z-20" 
                        : "bg-cedra-500 border-white shadow-cedra-500/40 group-hover:scale-110"
                 )}>
                    <MapPin size={16} fill="currentColor" />
                 </div>
              </div>
            </MarkerContent>
          </MapMarker>
        ))}

        {/* Exact mapcn Standalone Popup Pattern */}
        {selectedStore && (
          <MapPopup
            longitude={selectedStore.coords.lng}
            latitude={selectedStore.coords.lat}
            onClose={() => setSelectedStore(null)}
            closeButton={false} 
            focusAfterOpen={false}
            closeOnClick={false}
            className="w-72"
          >
            <div className="relative group/popup overflow-hidden rounded-xl">
              {/* Background LiquidGlass Effect */}
              <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-xl -z-10" />
              
              {/* Top Accent Line */}
              <div className="h-1 w-full bg-cedra-500" />

              <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="font-black italic uppercase tracking-tighter text-white text-lg leading-tight">
                            {selectedStore.name}
                        </h3>
                        <p className="text-[11px] text-zinc-400 leading-snug">
                            {selectedStore.address}
                        </p>
                    </div>
                    <button 
                        onClick={() => setSelectedStore(null)}
                        className="text-zinc-500 hover:text-white transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-2.5 py-3 border-y border-white/5">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        <Clock size={12} className="text-cedra-500" />
                        {selectedStore.hours}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        <Phone size={12} className="text-cedra-500" />
                        {selectedStore.phone}
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button 
                        size="sm" 
                        className="flex-1 h-9 text-[10px] bg-white text-black hover:bg-zinc-200 font-bold uppercase tracking-widest rounded-lg shadow-lg" 
                        onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedStore.coords.lat},${selectedStore.coords.lng}`)}
                    >
                        <Navigation size={12} className="mr-1.5" />
                        Itinéraire
                    </Button>
                </div>
              </div>
            </div>
          </MapPopup>
        )}
      </Map>
    </div>
  );
}
