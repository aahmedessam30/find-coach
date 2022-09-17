<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        v-model.trim="firstName.value"
        @blur="clearValidation('firstName')"
      />
      <p v-if="!firstName.isValid">First name is invalid.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        v-model.trim="lastName.value"
        @blur="clearValidation('lastName')"
      />
      <p v-if="!lastName.isValid">Last name is invalid.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.value"
        @blur="clearValidation('description')"
      />
      <p v-if="!description.isValid">Description is invalid.</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="hourlyRate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="rate.value"
        @blur="clearValidation('rate')"
      />
      <p v-if="!rate.isValid">Rate is invalid.</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.value"
          @blur="clearValidation('areas')"
        />
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.value"
          @blur="clearValidation('areas')"
        />
        <label for="backend">Backend</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.value"
          @blur="clearValidation('areas')"
        />
        <label for="career">Career</label>
      </div>
      <p v-if="!areas.isValid">Please select at least one area.</p>
    </div>
    <p v-if="!formIsValid">Please fix the errors and try again.</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ["save-data"],
  data() {
    return {
      firstName: {
        value: "",
        isValid: true,
      },
      lastName: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
      rate: {
        value: null,
        isValid: true,
      },
      areas: {
        value: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const coachData = {
        first: this.firstName.value,
        last: this.lastName.value,
        desc: this.description.value,
        rate: this.rate.value,
        areas: this.areas.value,
      };
      this.$emit("save-data", coachData);
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.value === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }

      if (this.lastName.value === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }

      if (this.description.value === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }

      if (!this.rate.value || this.rate.value < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }

      if (this.areas.value.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    clearValidation(input) {
      this[input].isValid = true;
      this.formIsValid = true;
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 1rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

div > div {
  display: inline-block;
  margin-right: 1rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label,
p {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
