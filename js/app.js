import React from 'react'
import ReactDOM from "react-dom/client";
import results from '../results.json'

'use strict';

const App = () => {
    // console.log(Object.entries(results.results))
    return (
        <section className="py-8 md:py-12">
            <div className=''>
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Results</h1>
                            <p className="mt-2 text-sm text-gray-700">A list of the results from your Pa11y test.</p>
                            <p className="mt-2 text-lg text-red-600">Errors: {results.errors}</p>
                        </div>
                    </div>
                    {Object.entries(results.results).map((result, index) => (
                        <div className="mt-8">
                            <h2 className="text-xl md:text-2xl text-indigo-600 mb-2 font-bold">{result[0]}</h2>
                            <div className="-mx-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">Impact</th>
                                            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">Code</th>
                                            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Message</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Context</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Runner</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {
                                            result[1].map((item, itemIndex) => <LineItem item={item} key={`${index}-${itemIndex}`} />)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const LineItem = ({ item }) => {
    const { code, message, context, runner, runnerExtras } = item;
    const { impact, help } = runnerExtras;

    return (
        <tr>
            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                {impact}
                <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Code</dt>
                    <dd className="mt-1 truncate text-gray-700">{code}</dd>
                    <dt className="sr-only sm:hidden">Message</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">{message}</dd>
                </dl>
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{code}</td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{help}</td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"><div className='bg-gray-100 p-1'>{context}</div></td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell text-right">{runner}</td>
        </tr>
    )
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
