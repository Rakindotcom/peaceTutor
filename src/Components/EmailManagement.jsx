import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FaEnvelope, FaTrash, FaEye, FaDownload, FaPaperPlane } from 'react-icons/fa';
import { showToast, toastMessages } from '../utils/toast';
import LoadingSpinner from './UI/LoadingSpinner';
import EmailTemplates from './EmailTemplates';

const EmailManagement = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('newsletter');
  const [selectedEmails, setSelectedEmails] = useState([]);

  useEffect(() => {
    const unsubscribeNewsletter = onSnapshot(
      query(collection(db, 'newsletter'), orderBy('subscribedAt', 'desc')),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNewsletters(data);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching newsletter subscriptions:', error);
        setIsLoading(false);
      }
    );

    const unsubscribeMessages = onSnapshot(
      query(collection(db, 'contactMessages'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setContactMessages(data);
      },
      (error) => {
        console.error('Error fetching contact messages:', error);
      }
    );

    return () => {
      unsubscribeNewsletter();
      unsubscribeMessages();
    };
  }, []);

  const formatTimestamp = (timestamp) => {
    try {
      if (!timestamp) return 'N/A';
      if (timestamp.toDate) {
        return timestamp.toDate().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short'
        });
      }
      return new Date(timestamp).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    } catch {
      return 'N/A';
    }
  };

  const handleUnsubscribe = async (id) => {
    try {
      await updateDoc(doc(db, 'newsletter', id), {
        status: 'unsubscribed',
        unsubscribedAt: new Date()
      });
      showToast.success('Email unsubscribed successfully');
    } catch (error) {
      console.error('Error unsubscribing email:', error);
      showToast.error('Failed to unsubscribe email');
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await deleteDoc(doc(db, 'contactMessages', id));
      showToast.success(toastMessages.dataDeleteSuccess);
    } catch (error) {
      console.error('Error deleting message:', error);
      showToast.error(toastMessages.dataDeleteError);
    }
  };

  const exportEmails = () => {
    const activeEmails = newsletters.filter(sub => sub.status === 'active');
    const emailList = activeEmails.map(sub => sub.email).join('\n');

    const blob = new Blob([emailList], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-emails-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast.success(toastMessages.dataExportSuccess);
  };



  if (isLoading) {
    return <LoadingSpinner size="lg" message="Loading email data..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Email Management</h1>
        <button
          onClick={exportEmails}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <FaDownload />
          Export Emails
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('newsletter')}
          className={`px-6 py-3 font-semibold ${activeTab === 'newsletter'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-600 hover:text-blue-600'
            }`}
        >
          Newsletter Subscriptions ({newsletters.length})
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-6 py-3 font-semibold ${activeTab === 'messages'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-600 hover:text-blue-600'
            }`}
        >
          Contact Messages ({contactMessages.length})
        </button>
        <button
          onClick={() => setActiveTab('send')}
          className={`px-6 py-3 font-semibold flex items-center gap-2 ${activeTab === 'send'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-600 hover:text-blue-600'
            }`}
        >
          <FaPaperPlane />
          Send Email
        </button>
      </div>

      {/* Newsletter Subscriptions */}
      {activeTab === 'newsletter' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Newsletter Subscriptions</h2>
            <p className="text-gray-600 text-sm">
              Active: {newsletters.filter(sub => sub.status === 'active').length} |
              Unsubscribed: {newsletters.filter(sub => sub.status === 'unsubscribed').length}
            </p>
          </div>

          {newsletters.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No newsletter subscriptions yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subscribed At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {newsletters.map((subscription) => (
                    <tr key={subscription.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaEnvelope className="text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{subscription.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${subscription.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                          }`}>
                          {subscription.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatTimestamp(subscription.subscribedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {subscription.source || 'website'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {subscription.status === 'active' && (
                          <button
                            onClick={() => handleUnsubscribe(subscription.id)}
                            className="text-red-600 hover:text-red-900 mr-3"
                            title="Unsubscribe"
                          >
                            Unsubscribe
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Contact Messages */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Contact Messages</h2>
            <p className="text-gray-600 text-sm">
              Total messages: {contactMessages.length}
            </p>
          </div>

          {contactMessages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No contact messages yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contactMessages.map((message) => (
                    <tr key={message.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {message.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaEnvelope className="text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{message.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {message.message}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatTimestamp(message.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete message"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Send Email */}
      {activeTab === 'send' && <EmailTemplates />}


    </div>
  );
};

export default EmailManagement;