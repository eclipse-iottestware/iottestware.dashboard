#!/usr/bin/python
import os
import sys
import subprocess
import json
import argparse

'''
This file is used to generate the latest Test Suites version file during Docker build.
This file must be executed after installing the Test Suites (calling install.py)
'''

parser = argparse.ArgumentParser(description='Checks the git log of a Test Suite and generates a JSON summary')
parser.add_argument("-p", required=True, help="Path of local git repository")
parser.add_argument("-n", required=True, choices=['mqtt', 'coap'], help="Name of the Test Suite")
parser.add_argument("-o", required=True, help="Path for the output file")
args = parser.parse_args()

mqtt_repository = "https://github.com/eclipse/iottestware.mqtt"
coap_repository = "https://github.com/eclipse/iottestware.coap"

def main(repo_path, name, output_path):
	# store the origin path
	origin_path = os.getcwd()

	os.chdir(repo_path)

	out_log = get_git_log(name)

	# go back to enable relative paths
	os.chdir(origin_path)
	out_file = output_path + '/' + name + '.json'

	# check if output directory exists
	if not os.path.exists(output_path):
		os.makedirs(output_path)

	with open(out_file, 'w') as f:
		f.write(out_log)


def get_git_log(name):
	# see https://git-scm.com/docs/pretty-formats
	# TODO: get the branch
	log_format = '--pretty=format:"%H %aI"'
	out, err = subprocess.Popen(['git', 'log', '-n1', log_format], stdout=subprocess.PIPE).communicate()
	tokens = out.replace('"', '').split()	# replace the leading and trailing " marks before split
	commit = tokens[0]
	date = tokens[1]

	repo = ''
	if name == 'mqtt':
		repo = mqtt_repository
	elif name == 'coap':
		repo = coap_repository

	commit_link = repo + '/commit/' + commit

	return json.dumps({
		"testsuite": {
			"name": name, "repository": repo, "commit": commit, "date": date, "commit_link": commit_link
		}
	}, indent=4)


if __name__ == '__main__':
	if os.path.isdir(args.p):
		main(args.p, args.n, args.o)
	else:
		print("Given path <" + args.p + "> is invalid")
		sys.exit()
