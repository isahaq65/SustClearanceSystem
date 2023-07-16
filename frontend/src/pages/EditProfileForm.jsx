import React from 'react'

const EditProfileForm = () => {
  return (
    <>
   <section className="my-2">
      <div className="container emp-profile">
        <form method="post">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <div className="d-flex justify-content-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                    alt=""
                  />
                </div>
                <div className="file btn btn-lg btn-primary">
                  Change Photo
                  <input type="file" name="file" />
                </div>
              </div>
            </div>
            <section className="my-3 container col-md-8">
    
          <div>
             <div className="form-group row">
            <label
              for="staticEmail"
              className="pt-3 col-md-3 col-form-label "
              style={{ fontWeight: 'bold', color: 'black' }}
            >
              1. Name :
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                readonly
                className="border-btm"
                id="staticEmail"
                value="email@example.com"
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              for="inputPassword"
              style={{ fontWeight: 'bold', color: 'black' }}
              className="pt-3 col-sm-3 col-form-label"
            >
              2. Name(in Bangla) :
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="border-btm"
                id="inputPassword"
                value="dddd"
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              for="staticEmail"
              style={{ fontWeight: 'bold', color: 'black' }}
              className="pt-3 col-sm-3 col-form-label pt-2"
            >
              3. Father's Name(in english) :
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                readonly
                className="border-btm"
                id="staticEmail"
                value="email@example.com"
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              for="inputPassword"
              className="pt-3 col-sm-3 col-form-label"
              style={{ fontWeight: 'bold', color: 'black' }}
            >
              4. Father's Name(in bangla) :
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="border-btm"
                id="inputPassword"
                value="dddd"
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              for="staticEmail"
              style={{ fontWeight: 'bold', color: 'black' }}
              className="pt-3 col-sm-3 col-form-label pt-2"
            >
              5. Registration :
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                readonly
                className="border-btm"
                id="staticEmail"
                value="email@example.com"
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              for="inputPassword"
              style={{ fontWeight: 'bold', color: 'black' }}
              className="pt-3 col-sm-3 col-form-label"
            >
              6. Dicipline :
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="border-btm"
                id="inputPassword"
                value="dddd"
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              for="staticEmail"
              className="pt-3 col-sm-3 col-form-label pt-2"
              style={{ fontWeight: 'bold', color: 'black' }}
            >
              7. School :
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                readonly
                className="border-btm"
                id="staticEmail"
                value="email@example.com"
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              for="inputPassword"
              style={{ fontWeight: 'bold', color: 'black' }}
              className="pt-3 col-sm-3 col-form-label"
            >
              8. Exam name & year :
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="border-btm"
                id="inputPassword"
                value="dddd"
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              for="staticEmail"
              className="pt-3 col-sm-3 col-form-label pt-2"
            >
              1. Name :
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                readonly
                className="border-btm"
                id="staticEmail"
                value="email@example.com"
              />
            </div>
          </div>
          <div className="form-group row">
            <label for="inputPassword" className="pt-3 col-sm-3 col-form-label">
              2. Father's Name(in english) :
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="border-btm"
                id="inputPassword"
                value="dddd"
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div
                className="recommend"
                style={{ fontWeight: 'bold', color: 'black' }}
              >
                <div> Recommendation of department head</div>
                <input
                  type="text"
                  readonly
                  className="border-btm"
                  style={{ textAlign: 'center' }}
                  id="staticEmail"
                  value="email@example.com"
                />
                <div style={{ color: 'gray' }}> (signature)</div>
              </div>
            </div>
            <div className="col-6">
              <div
                className="recommend"
                style={{ fontWeight: 'bold', color: 'black' }}
              >
                <div> Recommendation of department head</div>

                <div> Recommendation of department head</div>
              </div>
            </div>
          </div>
        </div>
      </section>

            
          </div>
        </form>
      </div>
    </section>
    </>
  )
}

export default EditProfileForm