import { NavLink, Outlet } from 'react-router-dom';
import AuthLeftPanel from '../shared/components/AuthLeftLayout';
 
export default function ForgotPage() {
//   const { symbol } = useParams<{ symbol: string }>();
 
  const tabStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'inline-block',
    padding: '8px 16px',
    marginRight: '4px',
    textDecoration: 'none',
    borderBottom: isActive ? '2px solid #0F62FE' : '2px solid transparent',
    color: isActive ? '#0F62FE' : '#9EA3AE',
    fontWeight: isActive ? 'semibold' : 'normal',
  });
 
  return (
    <div className="flex h-screen w-full bg-white font-sans">
      <AuthLeftPanel />

      <div className="flex w-full flex-col items-center justify-center p-[24px] lg:w-1/2">
        <div className="w-full max-w-md">
            <div className="mb-6 flex flex-col items-start">
                <img
                    src="../src/assets/Vector.svg"
                    alt="Logo"
                    className="mb-2 w-10"
                />
                <h2 className="text-xl font-semibold text[#2A2A2B]">
                    Nest App
                </h2>
            </div>
            {/* Tab navigation */}
            <nav style={{ borderBottom: '1px solid #EAECEF', marginBottom: '10px' }}>
                <NavLink to='forgotpassword'   style={tabStyle}>Forgot Password</NavLink>
                <NavLink to='forgotuserid' style={tabStyle}>Forgot User ID</NavLink>
            </nav>
            {/* Tab content renders here */}
            <Outlet />
        </div>
      </div>
    </div>
  );
}
