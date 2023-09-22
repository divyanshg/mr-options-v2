import React, { useState } from 'react';

import { Button } from './ui/Button';

function LogOut() {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const handleSwitchUser = async () => {
    setIsLoggingOut(true);
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="flex flex-row justify-end w-full p-4">
      <Button
        onClick={handleSwitchUser}
        isLoading={isLoggingOut}
        variant={"destructive"}
      >
        Logout
      </Button>
    </div>
  );
}

export default LogOut;
