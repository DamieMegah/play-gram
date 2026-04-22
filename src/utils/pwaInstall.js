let deferredPrompt = null;

export function initPWAInstall() {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
}

export async function triggerInstall() {
  if (!deferredPrompt) return false;
  console.log("working")
  deferredPrompt.prompt();

  const choice = await deferredPrompt.userChoice;

  if (choice.outcome === "accepted") {
    console.log("Installed");
  }

  deferredPrompt = null;
  return true;
}
