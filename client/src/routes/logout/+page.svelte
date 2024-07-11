<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Navbar from "../../components/Navbar.svelte";

  import { userStore, jobsStore, settingsStore } from "../../stores/stores";

  onMount(async () => {
    try {
      // Make a POST request to the logout API endpoint
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "same-origin",
      });

      if (response.ok) {
        // Logout successful, redirect to the home page
        userStore.set(null);
        jobsStore.set(null);
        settingsStore.set(null);
        goto("/");
      } else {
        // Handle logout error if needed
        console.error("Logout failed");
      }
    } catch (error) {
      // Handle any network or other errors
      console.error("Error during logout:", error);
    }
  });
</script>

<Navbar />
<div>
  <p>Logging out...</p>
</div>

<style>
  p {
    margin-top:10rem;
    text-align:center;
  }
</style>