import { FC, ReactElement } from 'react';
import 'beercss';
import 'material-dynamic-colors';

const HomePage: FC = (): ReactElement => {
  return (
    <>
      {/* <nav className="m l left">
        <a>
          <i>home</i>
          <span>Home</span>
        </a>
        <a>
          <i>music note</i>
          <span>Songs</span>
        </a>
      </nav> */}

      <main className="responsive">
        <body className="dark">
          <div className="row">
            {/* main card */}
            <article className="round primary-container blur">
              <h2 className="heading">Welcome to Ripple Worship</h2>
              <p>
                Here is where you can find lyrics and chords for worship music! Go on and worship
                God!
              </p>
              <div className="large-space" />

              <p>Harvest Mission Community Church</p>
            </article>

            <div>
              {/* songs tab */}
              <article className="round on-secondary-fixed">
                <div className="row">
                  <div className="max">
                    <h4 className="heading">Songs</h4>
                    <p>Find, add, view worship songs with lyrics and chords</p>
                  </div>
                  <div className="circle extra primary-container">
                    <i className="extra primary-text fill absolute center middle">music_note</i>
                  </div>
                </div>
              </article>

              <article className="round on-secondary-fixed">
                <div className="row">
                  <div className="max">
                    <h4 className="heading">My Setlists</h4>
                    <p>Create setlists for your worship sessions</p>
                  </div>
                  <div className="circle extra primary-container">
                    <i className="extra primary-text fill absolute center middle">queue_music</i>
                  </div>
                </div>
              </article>

              <article className="round on-secondary-fixed">
                <div className="row">
                  <div className="max">
                    <h4 className="heading">My Groups</h4>
                    <p>Create setlists with other people in your groups</p>
                  </div>
                  <div className="circle extra primary-container">
                    <i className="extra primary-text fill absolute center middle">
                      supervised_user_circle
                    </i>
                  </div>
                </div>
              </article>

              <article className="round on-secondary-fixed">
                <div className="row">
                  <div className="max">
                    <h4 className="heading">Resources</h4>
                    <p>Learn more lessons, tips, and tricks for your worship sessions</p>
                  </div>
                  <div className="circle extra primary-container">
                    <i className="extra primary-text fill absolute center middle">article</i>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </body>
      </main>
    </>
  );
};

export default HomePage;
