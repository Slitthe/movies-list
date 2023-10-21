import React, { createContext, useContext, useEffect, useState } from "react";
import { ConfigApi } from "@/types/configApi";

const ImageConfigContext = createContext<ConfigApi | null>(null);

interface ImageConfigContextProps {
  children: React.ReactNode;
}
export function ImageConfigContextProvider({
  children,
}: ImageConfigContextProps) {
  const [config, setConfig] = useState<ConfigApi | null>(null);

  useEffect(() => {
    fetch("/api/getConfig")
      .then((res) => res.json())
      .then((resConfig: ConfigApi) => setConfig(resConfig));
  }, []);

  // console.log(config);

  return (
    <ImageConfigContext.Provider value={config}>
      {children}
    </ImageConfigContext.Provider>
  );
}

export function useImageConfig() {
  return useContext(ImageConfigContext);
}
