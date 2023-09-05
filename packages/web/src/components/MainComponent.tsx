import { TabComponent } from "./TabComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export const MainComponent = () => {
  return (
    <div className="min-h-screen w-full z-10 flex px-[100px] pt-[50px] ">
      <Tabs defaultValue="starships">
        <TabsList>
          <TabsTrigger value="starships">Starships</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
        </TabsList>
        <TabsContent value="starships">
          <TabComponent type="starships" />
        </TabsContent>
        <TabsContent value="vehicles">
          <TabComponent type="vehicles" />
        </TabsContent>
      </Tabs>
    </div>
  );
};
