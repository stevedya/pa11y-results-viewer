import React, { useMemo, useState, useEffect } from 'react'
import ReactDOM from "react-dom/client";

// Add results file here
import results from '../results.json'

'use strict';

const App = () => {
    const [resultsArray, setResultsArray] = useState(Object.entries(results.results));
    const [selectedCodes, setSelectedCodes] = useState();

    const filterOptions = useMemo(() => {
        const filteredItems = [];

        // Not the most efficient but whatever
        resultsArray.forEach((item) => {
            item[1].forEach((x) => filteredItems.push(x.code))
        })

        // Remove duplicates from that large list
        return [... new Set(filteredItems)]
    }, [resultsArray])


    useEffect(() => {
        setSelectedCodes(filterOptions.reduce((prev, current, index) => (
            { ...prev, [current]: false }
        ), {}))
    }, [filterOptions])


    // const filteredResults = useMemo(() => {
    // if (selectedCodes && selectedCodes.length > 0) {
    // return resultsArray.filter((item) => {

    //     // Filter out the stuff in the results array
    //     const resultsArray = item[1].filter((resultInfo) => {
    //         return selectedCodes.includes(resultInfo['code'])
    //      })

    //      if (resultsArray.length > 0) {
    //          return [item[0], resultsArray]
    //      } 
    //     //  TODO: Fix this filtering
    // })
    // }

    // }, [resultsArray, selectedCodes])

    const handleChange = (e) => {
        setSelectedCodes((previousValues) => ({ ...previousValues, [e.target.value]: !e.target.checked }))
    }

    const renderResults = (result, index) => {
        if (!result) {
            return;
        }
        // if (filteredResults && filteredResults.length > 0) {
        //     return filteredResults[1].map((item, itemIndex) => <LineItem item={item} key={`${index}-${itemIndex}`} />)
        // }
        else {
            return result[1].map((item, itemIndex) => <LineItem item={item} key={`${index}-${itemIndex}`} />)
        }
    }

    useEffect(() => {
        renderResults();
    }, [selectedCodes])

    return (
        <section className="py-8 md:py-12">
            <div className='container'>
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Results</h1>
                            <p className="mt-2 text-sm text-gray-700">A list of the results from your Pa11y test.</p>
                            <div className="flex gap-6 divide-x">
                                <p className="mt-2 text-lg text-gray-900 font-medium">Pages: {results.total}</p>
                                <p className="mt-2 text-lg text-red-600 pl-6 font-medium">Errors: {results.errors}</p>
                            </div>
                            <hr className="my-6" />
                            <h3 className="font-medium mb-1 text-md mt-6">Filter by code</h3>
                            <div className="flex flex-wrap gap-6 p-3 rounded-md bg-gray-50">
                                {
                                    filterOptions.map((filter, index) => (
                                        <div className="inline-flex items-center" key={index}>
                                            <input
                                                // checked={selectedCodes[filter]}
                                                onChange={(e) => handleChange(e)}
                                                className="accent-pink-500 mr-2"
                                                value={filter}
                                                type="checkbox"
                                            />
                                            <span className="text-gray-600">{filter}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    {resultsArray && resultsArray.length > 0 && resultsArray.map((result, index) => (
                        <div className="mt-8">
                            <h2 className="text-xl md:text-2xl text-indigo-600 mb-2 font-bold"><a target="_blank" href={result[0]}>{result[0]}</a></h2>
                            {result[1] && result[1].length < 1 ?
                                <p>Nothing to see here 🎉</p>
                                :
                                <div className="-mx-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg" >
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">Impact</th>
                                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">Code</th>
                                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Message</th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Context</th>
                                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">Runner</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {renderResults(result, index)}
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}

const LineItem = ({ item }) => {
    const { code, message, context, runner, runnerExtras } = item;
    const { impact, help } = { ...runnerExtras };

    return (
        <tr>
            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                {impact}
                <dl className="font-normal lg:hidden">
                    <dt className='text-xs font-bold mt-2'>Code</dt>
                    <dd className="mt-1 truncate text-gray-700">{code}</dd>
                    <dt className='text-xs font-bold mt-2'>Message</dt>
                    <dd className="mt-1 truncate text-gray-500 lg:hidden">{help}</dd>
                    <dt className='text-xs font-bold mt-2'>Context</dt>
                    <dd className="mt-1 truncate text-gray-500 lg:hidden bg-gray-100">{context}</dd>
                </dl>
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{code}</td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{help}</td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"><div className='bg-gray-100 p-1'>{context}</div></td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell text-right">{runner}</td>
        </tr>
    )
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
