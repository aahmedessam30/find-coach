<template>
  <section>
    <base-card>
      <h2>Register as a Coach</h2>
      <CoachForm @save-data="saveData" />
    </base-card>
  </section>
</template>

<script>
import CoachForm from "@/components/coaches/CoachForm.vue";
export default {
  components: { CoachForm },
  methods: {
    saveData(coachData) {
      this.$store.dispatch("coaches/registerCoach", coachData);
      this.$router.replace("/coaches");
    },
  },
};
</script>
