import { Outlet } from "react-router-dom";

function AppLayout() {
 return (
   <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 font-semibold bg-gray-100">
        Health First
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
     </main>

   </div>
 );
}

export default AppLayout;