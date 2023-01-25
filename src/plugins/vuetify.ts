import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import * as labs from "vuetify/labs/components";

export default createVuetify({
  components: {
    ...labs,
  },
  ssr: true,
});
