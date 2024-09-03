
const ContactForm = () => {
  return (
    <section>
      <div className="card mx-auto my-4" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <h5 className="card-title">Contact Form</h5>
          <form>
            {/* 2 column grid layout with text inputs for the first and last names */}
            <div className="row mb-4">
              <div className="col">
                <div className="form-outline">
                  <input type="text" id="form3Example1" className="form-control" />
                  <label className="form-label" htmlFor="form3Example1">First name</label>
                </div>
              </div>
              <div className="col">
                <div className="form-outline">
                  <input type="text" id="form3Example2" className="form-control" />
                  <label className="form-label" htmlFor="form3Example2">Last name</label>
                </div>
              </div>
            </div>

            {/* Email input */}
            <div className="form-outline mb-4">
              <input type="email" id="form3Example3" className="form-control" />
              <label className="form-label" htmlFor="form3Example3">Email address</label>
            </div>

            {/* Password input */}
            <div className="form-outline mb-4">
              <input type="password" id="form3Example4" className="form-control" />
              <label className="form-label" htmlFor="form3Example4">Password</label>
            </div>

            {/* Checkbox */}
            <div className="form-check d-flex justify-content-center mb-4">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" defaultChecked />
              <label className="form-check-label" htmlFor="form2Example3">
                Subscribe to our newsletter
              </label>
            </div>

            {/* Submit button */}
            <div className="text-center mb-4">
              <button type="submit" className="btn btn-primary">
                Sign up
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
