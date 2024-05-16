import React from "react";
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import "./styles/footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <MDBFooter bgColor="light" className="text-center text-lg-left">
        <MDBContainer className="p-4">
          <MDBRow>
            <MDBCol lg="6" md="12" className="mb-4 mb-md-0">
              <h5 className="text-uppercase">O aplikaciji</h5>

              <p>Aplikacija je vlastiti projekt nastala kao vježba.</p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a className="text-dark">Ivan Pejić</a>
        </div>
      </MDBFooter>
    </div>
  );
}
