import express from "express";
import { google } from "googleapis";
import ee from "@google/earthengine";

const privateKey = {
  type: "service_account",
  project_id: "ee-way2intobby",
  private_key_id: "7a34019394e26dab83cbef348d9cc657a0a89447",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCq3DFVmeRLsy6k\nLb0FDwX7zYrEvNV62ejBjshtMSsF85alJxHmKbhmyjioARhWQvXbxVKIOuPS0no3\ngg/GL8ST3yOIB/8vi/rRy0spsUi6W+ouRdBFVoHjSWG9E1tUoAM3GdLiisCdfnQX\nBEfT1/j35v7WFxK+GQZEY1KxN4KXI/f6T6m2//SZW3X5zhZ+kCVQiteElVKQaWKO\nO6a86P2U0VK5d7rXJvfkY2GYpjiVFLR79AfsGC3q6EY4erqp6zkHPZ3JpZk9b3zP\nyVGrJL4M9bJIlbVreZinjS1vVpOYL8CuyXSCuvSjAg4cIcZHQ5BZSgI2Ve17f9Sn\nkrKS9lXTAgMBAAECggEAFyJINcBn9k31BzrAKJKvqzfZzaiJuSAPEUINZidtnVkt\ncQAYvtKwSo6f3DOFwYxAcLjHY3WhyjZAYQqlqx5lneXtECqRBTWNSOGfNC5yW/U9\nAHXobLL5VDZn2utnhs5BkTDYal8CFHD+M+2a8haAecRXhdJK8d0+iXzvQdpzvpXh\n1KzD+JjkKk/VDGDaY6Zcf2/hLHPw81wKQ9h5p3zO9enZo/IYji683cKF/FF8Ki5l\n7UkAT0FEuWeseyLs8RRb9kEtOs2qgeT42kS4HiebC+T8H0umqQltMY4dAiCJSZqo\nAAG1Q9G0WgBblpywGVZQtAVgCWiAez6w0K+x1uR/lQKBgQDjZbSpEPykCtugjlbQ\nCx+VhdGuFbos4yPsY6vuN7dxIgnpbS8qys7bvU3BzWgWsHDt/7bZqVgS1YCn7eS4\n7kT0SgGIyIp3qAsi1S2E/wsLE+WSUexbfBlBSKx6O5ihZW8RaRsuMH2XH+XYVDgt\nzlpR9mP415AtbW0jJQnQpTYfdQKBgQDAWfcWXK4rwK8UWZE/MfFuHYpklIuRP+bF\nwIucE0fWMmQuLQg6LshVuQoe0yX/+ae10bWC12XDRheMcE9Z2uKixbZrsvCntIk+\nUb9uti1Pr5Ecy96CNER64qt8BQhaQYaFKTbbX6uU4jjxKYSv01uwtX5kOZVxtLDg\nPGZzCpr/JwKBgQDJU1eCw8ZZ2j8exEa6BM8ey46b6SKe8S7x8EDdNLkV0cQixYcY\nBNzmEZERP7GjPO2O2XJi/Ro7+ojgpK92x4WHHyqClsJ5M+9AFKsrb76wPRpo1F1F\nlfaqJRSHV9JHOo3+RSdKWqYmsZgGUnI2o9a1cEaMnxVIEvSoQ/ePoWXsrQKBgAqQ\nJjiNKGdwsmysqoRM6tRAPQxe9/cnCjZL557PlD9YDxZWFMCVNx02By9AKzMOc75R\nYOVpjMYXgE2PEVx+37lOoEDz17FuAadxd9DNollg69gn/fUqh6Qz9HTgFeBW/tsr\nMz8C1vpbHgNoY0gAlGV04hcA7osLADegOYQRzgc7AoGAZR3o9wFvcfsmKnHTqVfg\nXdgF8to/pL3dlbzqPo7AFL59bjApJxA2e8YLSrBA3wBe4zWfJAP6NvnYJF8m21qe\nXDr0JWA0UcGf3DLYRH3JuKEOS8xB3UL7kPu4f6NBznEau6DG5vhSY91VMS/ihv5H\nDG/EkzzshMQAhGunr6qK8PQ=\n-----END PRIVATE KEY-----\n",
  client_email: "ee-way2intobby@appspot.gserviceaccount.com",
  client_id: "103482314125807768935",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/ee-way2intobby%40appspot.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

const authClient = new google.auth.JWT(
  privateKey.client_email,
  null,
  privateKey.private_key,
  ["https://www.googleapis.com/auth/earthengine"]
);

// app.listen(5000);

// Authenticate with Earth Engine using the private key
google.options({ auth: authClient });

ee.data.authenticateViaPrivateKey(
  privateKey,
  () => {
    // console.log("Authentication successful.");
    initialize();
  },
  (err) => {
    // console.log({ err });
  }
);

const initialize = function () {
  ee.initialize(
    null,
    null,
    function () {
      // console.log("Earth Engine client library initialized.");
    },
    function (e) {
      // console.error("Initialization error: " + e);
    }
  );
};

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/getAuthToken/", function (req, res) {
  try {
    const authToken = ee.data.getAuthToken();
    res.send(authToken);
  } catch (e) {
    res.send(e);
  }
});
app.listen(5500);
// module.exports = app;
