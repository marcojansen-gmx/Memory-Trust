import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_FOOTPRINT } from '../../utils/mutations';
import { QUERY_FOOTPRINTS, QUERY_ME } from '../../utils/queries';

const FootprintForm = () => {
    const [footprintText, setText] = useState('');
    const [platform, setPlatform] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addFootprint, { error }] = useMutation(ADD_FOOTPRINT, {
        update(cache, { data: { addFootprint } }) {
          try {
            // could potentially not exist yet, so wrap in a try...catch
            const { footprints } = cache.readQuery({ query: QUERY_FOOTPRINTS });
            cache.writeQuery({
              query: QUERY_FOOTPRINTS,
              data: { footprints: [addFootprint, ...footprints] }
            });
          } catch (e) {
            console.error(e);
          }
      
          // update me object's cache, appending new footprint to the end of the array
          const { me } = cache.readQuery({ query: QUERY_ME });
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, footprints: [...me.footprints, addFootprint] } }
          });
        }
      });

    const handleChange = event => {


        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    }

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await addFootprint({
                variables: { footprintText, platform }
            });
            setText('');
            setPlatform('');
            setCharacterCount(0);
        } catch(e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handleFormSubmit}>
                <textarea 
                    placeholder="Here's a new footprint..." 
                    value={footprintText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}></textarea>
                <textarea 
                    placeholder="Here's the platform..." 
                    value={platform}
                    className="form-input col-12 col-md-9"
                    onChange={(event) => setPlatform(event.target.value)}></textarea>
                <button className="btn col-12 col-md-3" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FootprintForm;