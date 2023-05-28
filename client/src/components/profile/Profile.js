import { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';



const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
    const { id } = useParams();

    useEffect(() => {
        // console.log(id);
        getProfileById(id);
    }, [getProfileById, id]);

    return (
        <Fragment>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Link to='/profiles' className='btn btn-light'>
                        Back To Profiles
                    </Link>
                    {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user._id === profile.user._id && (
                            <Link to='/edit-profile' className='btn btn-dark'>
                                Edit Profile
                            </Link>
                        )}
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div className="profile-exp bg-white p-2">
                            {profile.experience.length > 0 ? (
                                <Fragment>
                                    {profile.experience.map((experience) => (
                                        <ProfileExperience key={experience._id} experience={experience} />
                                    ))}
                                </Fragment>
                            ) :
                                (<h4> No Experiences Details </h4>)
                            }
                        </div>

                        <div className="profile-edu bg-white p-2">
                            {
                                profile.education.length > 0 ? (
                                    <Fragment>
                                        {profile.education.map((education) => (
                                            <ProfileEducation key={education._id} education={education} />
                                        ))}
                                    </Fragment>
                                ) :
                                    (<h4>No Educations Details</h4>)
                            }
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);