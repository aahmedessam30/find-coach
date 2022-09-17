<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :title="area"
        :type="area"
      />
    </div>
    <div class="actions">
      <base-button link mode="outline" :to="contactLink">Contact</base-button>
      <base-button link :to="detailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script>
import BaseBadge from "../ui/BaseBadge.vue";
export default {
  components: { BaseBadge },
  props: {
    id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    areas: {
      type: Array,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },
    contactLink() {
      return this.$route.path + "/" + this.id + "/contact";
    },
    detailsLink() {
      return this.$route.path + "/" + this.id;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
