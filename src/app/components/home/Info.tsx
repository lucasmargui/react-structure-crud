
import Image from 'next/image';

const Info = () => {
  return (
    <section>
      <div className="card mt-3" >
          <div className="row g-0">
            <div className="col-md-6">
              <Image
                src="https://mdbootstrap.com/img/new/slides/031.jpg"
                className="card-img-top"
                alt="Description of the image"
              />
              <a href="#!">
                <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.10)' }}></div>
              </a>
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </p>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Info;