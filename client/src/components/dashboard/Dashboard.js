import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import DashboardAction from './DashboardAction';
import Experience from './Experience';
import Education from './Education';


const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();

    }, [getCurrentProfile]);
    return loading ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"> </i> Welcome {user && user.name}
        </p>
        {profile !== null ? (
            <Fragment>
                <DashboardAction />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => deleteAccount()}>
                        <i className="fas fas-user-minus"></i>
                        Delete My Account
                    </button>
                </div>
            </Fragment>
        ) : (
            <Fragment>
                <p>You have not yet created a profile, please add some info</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>
                    Create Profile
                </Link>
            </Fragment>
        )}
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => (
    {
        auth: state.auth,
        profile: state.profile
    }
)

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);